import request from 'supertest';
import app from '../../app';

describe('currentUser', () => {
  it('returns data about the currently logged in user', async () => {
    // First sign up
    const signUpResponse = await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'Test123',
      })
      .expect(201);

    const cookie = signUpResponse.get('Set-Cookie');

    let response = await request(app)
      .get('/api/users/currentUser')
      .set('Cookie', cookie) // adds auth header
      .expect(200);

    expect(response.body.currentUser.email).toEqual('test@test.com');
  });
});
