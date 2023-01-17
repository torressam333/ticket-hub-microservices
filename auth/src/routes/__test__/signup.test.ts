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
