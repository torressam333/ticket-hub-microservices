import request from 'supertest';
import app from '../../app';

it('returns 201 on successful sign up', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'Test123',
    })
    .expect(201);
});

it('returns 400 status code with invalid email', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({ email: 'fakeemail', password: 'Password123' })
    .expect(400);
});

it('returns 400 status code with invalid password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'Pass' })
    .expect(400);
});

it('returns 400 status code with missing input values', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({ email: '', password: '' })
    .expect(400);
});

it('disallows duplicate emails', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'Test123',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'Test123456',
    })
    .expect(400);
});

it('sets a cookie in session after successful signup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'Test123',
    })
    .expect(201);

  // Check headers
  expect(response.get('Set-Cookie')).toBeDefined();
});
