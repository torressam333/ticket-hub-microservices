import request from 'supertest';
import app from '../../app';

describe('signout route', () => {
  it('empties the session and returns a 200', async () => {
    // Sign in first
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'Test123',
      })
      .expect(201);

    // Sign out
    const response = await request(app).post('/api/users/signout').expect(200);
    const cookies = response.headers['set-cookie'];

    expect(cookies[0].session).not.toBeDefined();
  });
});
