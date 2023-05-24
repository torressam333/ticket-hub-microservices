import { natsWrapper } from '../../../NatsWrapper';
import { OrderCancelledSubscriber } from '../OrderCancelledSubscriber';
import Ticket from '../../../models/ticket';
import mongoose from 'mongoose';
import { OrderCancelledEvent } from '@torressam/common';
import { Message } from 'node-nats-streaming';

const setup = async () => {
  const subscriber = new OrderCancelledSubscriber(natsWrapper.client);

  const orderId = new mongoose.Types.ObjectId().toHexString();

  const ticket = Ticket.build({
    title: 'Concert',
    price: 300,
    userId: 'asdf',
  });

  ticket.set({ orderId });

  await ticket.save();

  const data: OrderCancelledEvent['data'] = {
    id: orderId,
    version: 0,
    ticket: {
      id: ticket.id,
      price: ticket.price,
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { subscriber, ticket, data, msg, orderId };
};

describe('Order Cancelled Event', () => {
  it('updates the ticket, publishes an event and acks the message', async () => {
    const { subscriber, ticket, data, msg, orderId } = await setup();

    await subscriber.onMessage(data, msg);

    const updatedTicket = await Ticket.findById(ticket.id);

    expect(updatedTicket!.orderId).not.toBeDefined();
    expect(msg.ack).toHaveBeenCalled();
    expect(natsWrapper.client.publish).toHaveBeenCalled();
  });
});
