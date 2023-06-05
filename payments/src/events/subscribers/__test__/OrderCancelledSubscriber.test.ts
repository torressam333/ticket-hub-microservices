import { natsWrapper } from '../../../NatsWrapper';
import { OrderCancelledSubscriber } from '../OrderCancelledSubscriber';
import { OrderCancelledEvent, OrderStatus } from '@torressam/common';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import Order from '../../../models/order';

const setup = async () => {
  const subscriber = new OrderCancelledSubscriber(natsWrapper.client);

  // Create and save order
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.Cancelled,
    userId: 'user123',
    price: 500,
  });

  await order.save();

  // Create data object
  const data: OrderCancelledEvent['data'] = {
    id: order.id,
    version: 1,
    ticket: {
      id: 'ticket1234',
      price: 35,
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { subscriber, data, order, msg };
};

describe('OrderCancelledSubscriber', () => {
  it('correctly cancels an order', async () => {
    const { subscriber, data, order, msg } = await setup();

    await subscriber.onMessage(data, msg);

    const updatedOrder = await Order.findById(order.id);

    expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
  });

  it('acks the message', async () => {
    const { subscriber, data, msg } = await setup();

    await subscriber.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
  });
});
