import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app';

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

// Global sign up helper for testing authenticated requests
global.signup = async () => {
  const email = 'test@test.com';
  const password = 'Test1234!';

  const signUpResponse = await request(app)
    .post('/api/users/signup')
    .send({ email, password })
    .expect(201);

  // Make cookie available for follow up tests requiring cookie/jwt
  return signUpResponse.get('Set-Cookie');
};
