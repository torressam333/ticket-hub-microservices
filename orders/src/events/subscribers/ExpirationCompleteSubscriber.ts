import { Message } from 'node-nats-streaming';
import {
  Subjects,
  Subscriber,
  ExpirationCompleteEvent,
  OrderStatus,
} from '@torressam/common';
import Order from '../../models/order';
import { queueGroupName } from './queueGroupName';
import { OrderCancelledPublisher } from '../publishers/OrderCancelledPublisher';
import { natsWrapper } from '../../NatsWrapper';

export class ExpirationCompleteSubscriber extends Subscriber<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
  queueGroupName = queueGroupName;

  async onMessage(data: ExpirationCompleteEvent['data'], msg: Message) {
    const { orderId } = data;
    const order = await Order.findById(orderId).populate('ticket');

    if (!order) throw new Error('Order not found');

    // Update order status to be cancelled if expiration:complete happens
    // from expiration service
    order.set({ status: OrderStatus.Cancelled });

    await order.save();

    // Let other services know the order has been cancelled
    await new OrderCancelledPublisher(natsWrapper.client).publish({
      id: orderId,
      version: order.version,
      ticket: {
        id: order.ticket.id,
        price: order.ticket.price,
      },
    });

    // No error? ack message
    msg.ack();
  }
}
