import request from 'supertest';
import app from '../../app';
import Order from '../../models/order';
import mongoose from 'mongoose';
import { OrderStatus } from '@torressam/common';
// import { stripe } from '../../stripe';

// // Tell jest to use mocked stripe client
// jest.mock('../../stripe.ts');

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

  /**
   * These tests are one way of testing a mock instance of stripe
   * by using the stripe.ts.old file to intercept and mock out a fake
   * call to stripe. Keeping these tests as reference.
   */
  // describe('stripe api client', () => {
  //   it('returns a 204 with valid inputs', async () => {
  //     const userId = new mongoose.Types.ObjectId().toHexString();

  //     const order = Order.build({
  //       id: new mongoose.Types.ObjectId().toHexString(),
  //       version: 0,
  //       price: 5,
  //       status: OrderStatus.Created,
  //       userId: userId,
  //     });

  //     await order.save();

  //     // Mocked Stripe request
  //     await request(app)
  //       .post('/api/payments')
  //       .set('Cookie', global.signup(userId))
  //       .send({
  //         token: 'tok_visa', // Fake token will always work for test stripe accts
  //         orderId: order.id,
  //       })
  //       .expect(201); // Payment created

  //     // Confirm stripe charges method was invoked with correct args
  //     expect(stripe.charges.create).toHaveBeenCalled();

  //     // Tell ts that create method is a jest mock else get errors
  //     const chargeArguments = (stripe.charges.create as jest.Mock).mock
  //       .calls[0][0];

  //     expect(chargeArguments.source).toEqual('tok_visa');
  //     expect(chargeArguments.amount).toEqual(order.price * 100);
  //     expect(chargeArguments.currency).toEqual('usd');
  //   });
  // });
});
