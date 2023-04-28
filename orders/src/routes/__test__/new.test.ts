import request from 'supertest';
import app from '../../app';
import Order, { OrderStatus } from '../../models/order';
import { natsWrapper } from '../../NatsWrapper';
import mongoose from 'mongoose';
import Ticket from '../../models/ticket';

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

  it('returns an error if ticket is already reserved', async () => {
    // Create and persist ticket
    const ticket = Ticket.build({
      title: 'Concert Ticket',
      price: 200,
    });

    await ticket.save();

    // Create order and associate new ticket
    const order = Order.build({
      ticket,
      userId: '123abc',
      status: OrderStatus.Created,
      expiresAt: new Date(), // Immediate expiration is fine for tests
    });

    await order.save();

    // Make request to app
    await request(app)
      .post('/api/orders')
      .set('Cookie', global.signup())
      .send({ ticketId: ticket.id })
      .expect(400);
  });

  it('returns a ticket successfully', async () => {
    // Create and persist ticket
    const ticket = Ticket.build({
      title: 'Snoop Dogg Ticket',
      price: 400,
    });

    await ticket.save();

    // Attempt to reserve ticket
    await request(app)
      .post('/api/orders')
      .set('Cookie', global.signup())
      .send({ ticketId: ticket.id })
      .expect(201);
  });

  it.todo('emits an order created event');
});
