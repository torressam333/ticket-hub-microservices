import request from 'supertest';
import app from '../../app';
import mongoose from 'mongoose';

describe('Updating tickets', () => {
  it('returns a 404 if a ticket id does not exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app)
      .put(`/api/tickets/${id}`)
      .set('Cookie', signup())
      .send({
        title: 'Title',
        price: 20,
      })
      .expect(404);
  });

  it('returns a 401 if the user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app)
      .put(`/api/tickets/${id}`)
      .send({
        title: 'Some Title',
        price: 45,
      })
      .expect(401);
  });

  it('returns a 401 if a user does not own the ticket', async () => {});

  it('returns a 400 if the payload has incorrect values', async () => {});

  it('correctly updates the ticket', async () => {});
});
