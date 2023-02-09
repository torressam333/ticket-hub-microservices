import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

// Declare in global setup scope
let mongo: any;

// No need to exp. import in other test files
declare global {
  function signup(): Promise<string[]>;
}

// Added per warning about false being default in mongo v7
mongoose.set('strictQuery', true);

// Before tests run - set up copy of mongodb in memory
beforeAll(async () => {
  process.env.JWT_KEY = 'nonsense_for_testing';
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
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

global.signup = async () => {
  // Build jwt payload {id, email}
  // Create jwt
  // Build session object
  // Convert session to JSON
  // Encode JSON as base 64
  // Return mock cooke with encoded data

  return [`session=${base64}`];
};
