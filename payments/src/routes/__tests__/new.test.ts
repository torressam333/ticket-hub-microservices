import request from 'supertest';
import app from '../../app';
import Order from '../../models/order';
import mongoose from 'mongoose';
import { OrderStatus } from '@torressam/common';

describe('Create new payment', () => {
  it('returns 404 when purchasing a non-existent order', async () => {
    await request(app)
      .post('/api/payments')
      .set('Cookie', global.signup())
      .send({
        token: 'fakeToken123',
        orderId: new mongoose.Types.ObjectId().toHexString(),
      })
      .expect(404);
  });

  it('returns 401 when trying to pay for an order that doesnt belong to user', async () => {
    const order = Order.build({
      id: new mongoose.Types.ObjectId().toHexString(),
      version: 0,
      price: 100,
      status: OrderStatus.Created,
      userId: new mongoose.Types.ObjectId().toHexString(),
    });

    await order.save();

    await request(app)
      .post('/api/payments')
      .set('Cookie', global.signup())
      .send({
        token: 'fakeToken123',
        orderId: order.id,
      })
      .expect(401);
  });

  it('returns 400 when purchasing an already cancelled order', async () => {
    const userId = new mongoose.Types.ObjectId().toHexString();

    const order = Order.build({
      id: new mongoose.Types.ObjectId().toHexString(),
      version: 0,
      price: 100,
      status: OrderStatus.Cancelled,
      userId: userId,
    });

    await order.save();

    await request(app)
      .post('/api/payments')
      .set('Cookie', global.signup(userId))
      .send({
        token: 'fakeToken123',
        orderId: order.id,
      })
      .expect(400);
  });
});
