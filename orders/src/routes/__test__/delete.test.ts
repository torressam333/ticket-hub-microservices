import request from 'supertest';
import app from '../../app';
import Ticket from '../../models/ticket';
import Order, { OrderStatus } from '../../models/order';
import { natsWrapper } from '../../NatsWrapper';
import mongoose from 'mongoose';

describe('Orders Service', () => {
  it('marks an order as cancelled', async () => {
    // Create ticket
    const ticket = Ticket.build({
      id: new mongoose.Types.ObjectId().toHexString(),
      title: 'Some Ticket Title',
      price: 100,
    });

    await ticket.save();

    const user = global.signup();

    // Make req to create an order
    const { body: order } = await request(app)
      .post('/api/orders')
      .set('Cookie', user)
      .send({ ticketId: ticket.id })
      .expect(201);

    // make a req to cancel order
    await request(app)
      .delete(`/api/orders/${order.id}`)
      .set('Cookie', user)
      .send()
      .expect(204);

    // assert order is cancelled (fetch from db and check)
    const updatedOrder = await Order.findById(order.id);

    expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
  });

  it('emits an order cancelled event', async () => {
    // Create ticket
    const ticket = Ticket.build({
      id: new mongoose.Types.ObjectId().toHexString(),
      title: 'Some Ticket Title',
      price: 100,
    });

    await ticket.save();

    const user = global.signup();

    // Make req to create an order
    const { body: order } = await request(app)
      .post('/api/orders')
      .set('Cookie', user)
      .send({ ticketId: ticket.id })
      .expect(201);

    // make a req to cancel order
    await request(app)
      .delete(`/api/orders/${order.id}`)
      .set('Cookie', user)
      .send()
      .expect(204);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
  });
});
