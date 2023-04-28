import request from 'supertest';
import app from '../../app';
import Order, { OrderStatus } from '../../models/order';
import mongoose from 'mongoose';
import Ticket from '../../models/ticket';

describe('Orders Service', () => {
  it('fetches orders for a particular user', async () => {
    // create 3 tickets and persist (to be reserved by test users)
    const ticket1 = await buildTicket();
    const ticket2 = await buildTicket();
    const ticket3 = await buildTicket();

    // create one order as user #1 and reserve ticket 1
    const userOne = global.signup();

    await request(app)
      .post('/api/orders')
      .set('Cookie', userOne)
      .send({ ticketId: ticket1.id })
      .expect(201);

    // create 2 orders as user #2 and reserve tickets 2 and 3
    const userTwo = global.signup();
    const { body: orderOne } = await request(app)
      .post('/api/orders')
      .set('Cookie', userTwo)
      .send({ ticketId: ticket2.id })
      .expect(201);

    const { body: orderTwo } = await request(app)
      .post('/api/orders')
      .set('Cookie', userTwo)
      .send({ ticketId: ticket3.id })
      .expect(201);

    // make request to get orders for user #2
    const userTwoOrders = await request(app)
      .get('/api/orders')
      .set('Cookie', userTwo)
      .expect(200);

    // expect 2 orders for user #2 were fetched
    expect(userTwoOrders.body.length).toEqual(2);
    expect(orderOne.id).toEqual(userTwoOrders.body[0].id);
    expect(orderTwo.id).toEqual(userTwoOrders.body[1].id);
  });
});

// Helper Function
const buildTicket = async () => {
  const ticket = Ticket.build({
    title: 'Music Event',
    price: 350,
  });

  await ticket.save();

  return ticket;
};
