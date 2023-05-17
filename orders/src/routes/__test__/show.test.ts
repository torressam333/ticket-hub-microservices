import request from 'supertest';
import app from '../../app';
import Ticket from '../../models/ticket';
import mongoose from 'mongoose';

describe('Orders Service', () => {
  it('fetches orders', async () => {
    // create a ticket
    const ticket = Ticket.build({
      id: new mongoose.Types.ObjectId().toHexString(),
      title: 'Some Ticket Title',
      price: 100,
    });

    await ticket.save();

    // Generate mock mongoose id
    // const ticketId = new mongoose.Types.ObjectId();
    const user = global.signup();

    // make a request to build an order with this ticket
    const { body: order } = await request(app)
      .post('/api/orders')
      .set('Cookie', user)
      .send({ ticketId: ticket.id })
      .expect(201);

    // // make a request to fetch the order
    const response = await request(app)
      .get(`/api/orders/${order.id}`)
      .set('Cookie', user)
      .expect(200);

    expect(response.body.ticket.title).toEqual(ticket.title);
    expect(response.body.id).toEqual(order.id);
  });

  it('returns error if one user tries fetch another users order ', async () => {
    // create a ticket
    const ticket = Ticket.build({
      id: new mongoose.Types.ObjectId().toHexString(),
      title: 'Some Ticket Title',
      price: 100,
    });

    await ticket.save();

    // Generate mock mongoose id
    // const ticketId = new mongoose.Types.ObjectId();
    const user = global.signup();
    const user2 = global.signup();

    // make a request to build an order with this ticket
    const { body: order } = await request(app)
      .post('/api/orders')
      .set('Cookie', user)
      .send({ ticketId: ticket.id })
      .expect(201);

    // // make a request to fetch the order with DIFFERENT user
    await request(app)
      .get(`/api/orders/${order.id}`)
      .set('Cookie', user2)
      .expect(401);
  });
});
