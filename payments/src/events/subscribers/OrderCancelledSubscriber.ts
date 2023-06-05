import {
  Subscriber,
  OrderCancelledEvent,
  Subjects,
  NotFoundError,
  OrderStatus,
} from '@torressam/common';
import { queueGroupName } from './queueGroupName';
import { Message } from 'node-nats-streaming';
import Order from '../../models/order';

export class OrderCancelledSubscriber extends Subscriber<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
    // Check Order Model for findByEvent static method implementation (making reusable on model itself)
    const order = await Order.findByEvent(data);

    // No order? Throw error and bail
    if (!order) throw new NotFoundError();

    // Found order? Set status to cancelled
    order.set({ status: OrderStatus.Cancelled });

    // Persist changes to DB
    await order.save();

    // msg acknowledgement
    msg.ack();
  }
}
