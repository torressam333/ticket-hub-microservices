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

  await ticket.save();

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
  const msg: Message = {
    ack: jest.fn(),
  };

  return { subscriber, ticket, order, data, msg };
};

describe('ExpirationCompleteSubscriber', () => {
  it('updates order status to cancelled', async () => {
    const { subscriber, order, data, msg } = await setup();

    await subscriber.onMessage(data, msg);

    const updatedOrder = await Order.findById(order.id);

    expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
  });

  it('emit an OrderCancelled event', async () => {
    const { subscriber, order, data, msg } = await setup();

    await subscriber.onMessage(data, msg);

    expect(natsWrapper.client.publish).toHaveBeenCalled();

    // Instruct TS to remember this is a mock from natsWrapper mock file
    // mock.calls keeps track of how many times publish has been invoked
    const eventData = JSON.parse(
      (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
    );

    expect(eventData.id).toEqual(order.id);
  });

  it('ack the message', async () => {
    const { subscriber, data, msg } = await setup();

    await subscriber.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
  });
});
