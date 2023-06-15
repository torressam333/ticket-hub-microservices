import { Message } from 'node-nats-streaming';
import {
  Subjects,
  Subscriber,
  PaymentCreatedEvent,
  NotFoundError,
  OrderStatus,
} from '@torressam/common';
import { queueGroupName } from './queueGroupName';
import Order from '../../models/order';

export class PaymentCreatedSubscriber extends Subscriber<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: PaymentCreatedEvent['data'], msg: Message) {
    const order = await Order.findById(data.orderId);

    if (!order) throw new NotFoundError();

    order.set({
      status: OrderStatus.Complete,
    });
    await order.save();

    msg.ack();
  }
}
