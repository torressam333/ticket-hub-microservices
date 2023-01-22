import request from 'supertest';
import app from '../../app';

describe('currentUser', () => {
  it('returns data about the currently logged in user', async () => {
    // First sign up using global signup testing method
    const cookie = await signup();

    const response = await request(app)
      .get('/api/users/currentUser')
      .set('Cookie', cookie) // adds auth header
      .send()
      .expect(200);

    expect(response.body.currentUser.email).toEqual('test@test.com');
  });
});
