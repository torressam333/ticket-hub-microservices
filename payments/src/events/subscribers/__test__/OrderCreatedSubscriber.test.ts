import { natsWrapper } from '../../../NatsWrapper';
import { OrderCreatedSubscriber } from '../OrderCreatedSubscriber';
import { OrderCreatedEvent, OrderStatus } from '@torressam/common';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import Order from '../../../models/order';

const setup = async () => {
  const subscriber = new OrderCreatedSubscriber(natsWrapper.client);

  const data: OrderCreatedEvent['data'] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.Created,
    expiresAt: '123456000',
    userId: 'user123',
    ticket: {
      id: 'ticket123',
      price: 50,
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { subscriber, data, msg };
};

describe('OrderCreatedSubscriber', () => {
  it('replicates the order info', async () => {
    const { subscriber, data, msg } = await setup();

    await subscriber.onMessage(data, msg);

    // Find order in collection and confirm price
    const order = await Order.findById(data.id);

    expect(order!.price).toEqual(data.ticket.price);
  });

  it('acks the message', async () => {
    const { subscriber, data, msg } = await setup();

    await subscriber.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
  });
});
