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

  return { subscriber, ticket, data, msg };
};
