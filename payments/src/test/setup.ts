import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { Buffer } from 'node:buffer';
import dotenv from 'dotenv';

dotenv.config().parsed;
// Declare in global setup scope
let mongo: any;

// No need to exp. import in other test files
declare global {
  function signup(id?: string): string[];
}

// Added per warning about false being default in mongo v7
mongoose.set('strictQuery', true);

// Works globally for all tests which emit events
jest.mock('../NatsWrapper');

// Before tests run - set up copy of mongodb in memory
beforeAll(async () => {
  process.env.JWT_KEY = 'nonsense_for_testing';
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  // i.e. Useful for nats wrapper publish call
  jest.clearAllMocks();

  // Delete all collections before each test to start anew
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

// Allow optional id vs generated id for simpler testing
// Otherwise I'd need to extract the id from a jwt in jest... not fun, lol
global.signup = (id?: string) => {
  const generateRandomId = new mongoose.Types.ObjectId().toHexString();
  // Build jwt payload {id, email}
  const payload = {
    id: id || generateRandomId,
    email: 'test@test.com',
  };

  // Create jwt
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session object
  const session = { jwt: token };

  // Convert session to JSON
  const sessionJSON = JSON.stringify(session);

  // Encode JSON as base 64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  // Return mock cooke with encoded data
  return [`session=${base64}`];
};
