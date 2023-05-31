import { natsWrapper } from '../../../NatsWrapper';
import Order from '../../../models/order';
import { ExpirationCompleteSubscriber } from '../ExpirationCompleteSubscriber';
import Ticket from '../../../models/ticket';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { ExpirationCompleteEvent, OrderStatus } from '@torressam/common';

const setup = async () => {
  const subscriber = new ExpirationCompleteSubscriber(natsWrapper.client);

  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'Concerto',
    price: 100,
  });

  const order = Order.build({
    userId: 'Abc123',
    status: OrderStatus.Cancelled,
    expiresAt: new Date(),
    ticket,
  });

  await order.save();

  const data: ExpirationCompleteEvent['data'] = {
    orderId: order.id,
  };

  // @ts-ignore
  const message: Message = {
    ack: jest.fn(),
  };

  return { subscriber, ticket, order, data, message };
};

describe('ExpirationCompleteSubscriber', () => {});
