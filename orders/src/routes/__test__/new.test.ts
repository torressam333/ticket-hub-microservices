import request from 'supertest';
import app from '../../app';
import Order from '../../models/order';
import { natsWrapper } from '../../NatsWrapper';
import mongoose from 'mongoose';

describe('App authentication', () => {
  it('has a route handler listening to /api/orders for post requests', async () => {
    const response = await request(app).post('/api/orders').send({});

    expect(response.status).not.toEqual(404);
  });

  it('can only be accessed if the user is signed in', async () => {
    await request(app).post('/api/orders').send({}).expect(401);
  });

  it('returns a status other than 401 if the user is not signed in', async () => {
    const response = await request(app)
      .post('/api/orders')
      .set('Cookie', global.signup())
      .send({});

    expect(response.status).not.toEqual(401);
  });
});

describe('Orders Service', () => {
  it('returns an error if ticket does not exist', async () => {
    // Generate random obect id using mongoose
    const ticketId = new mongoose.Types.ObjectId();

    await request(app)
      .post('/api/orders')
      .set('Cookie', global.signup())
      .send({ ticketId })
      .expect(404);
  });
  it('returns an error if ticket is already reserved', async () => {});
  it('returns a ticket successfully', async () => {});
});
