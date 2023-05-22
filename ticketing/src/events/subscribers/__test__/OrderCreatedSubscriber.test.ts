import Ticket from '../../../models/ticket';
import { natsWrapper } from '../../../NatsWrapper';
import { OrderCreatedSubscriber } from '../OrderCreatedSubscriber';
import { OrderCreatedEvent, OrderStatus } from '@torressam/common';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';

describe('OrderCreatedSubscriber', () => {
  const setup = async () => {
    // Create instance of subscriber
    const subscriber = new OrderCreatedSubscriber(natsWrapper.client);

    // Create and save a ticket
    const ticket = Ticket.build({
      title: 'Ticket title',
      price: 50,
      userId: 'abc123',
    });

    await ticket.save();

    // Create fake data object
    const data: OrderCreatedEvent['data'] = {
      id: new mongoose.Types.ObjectId().toHexString(),
      version: 0,
      status: OrderStatus.Created,
      userId: new mongoose.Types.ObjectId().toHexString(),
      expiresAt: 'fake-time-stamp',
      ticket: {
        id: ticket.id,
        price: ticket.price,
      },
    };

    // @ts-ignore
    const msg: Message = {
      ack: jest.fn(),
    };

    return { subscriber, ticket, data, msg };
  };

  it('sets the user id of the ticket', async () => {
    const { subscriber, ticket, data, msg } = await setup();

    await subscriber.onMessage(data, msg);

    const updatedTicket = await Ticket.findById(ticket.id);

    // Order id on ticket should be = to order id
    expect(updatedTicket!.orderId).toEqual(data.id);
  });

  it('acks the message', async () => {});
});
