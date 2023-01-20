import request from 'supertest';
import app from '../../app';

describe('Sign in route', () => {
  it('fails when an email that does not exist is supplied', async () => {
    await request(app)
      .post('/api/users/signin')
      .send({ email: 'test@test.com', password: 'Passy123' })
      .expect(400);
  });

  it('fails when an incorrect password is provided', async () => {
    // First create an acct
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'Test123',
      })
      .expect(201);

    // Sign in with a wrong password
    await request(app)
      .post('/api/users/signin')
      .send({ email: 'test@test.com', password: 'Passy123' })
      .expect(400);
  });

  it('responds with a valid cookie when provided valid credentials', async () => {
    // First create an acct
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'Test123',
      })
      .expect(201);

    // Sign in with a CORRECT password
    const response = await request(app)
      .post('/api/users/signin')
      .send({ email: 'test@test.com', password: 'Test123' })
      .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();
  });
});
