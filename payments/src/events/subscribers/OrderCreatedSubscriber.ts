import {
  Subscriber,
  OrderCreatedEvent,
  Subjects,
  OrderStatus,
} from '@torressam/common';
import { queueGroupName } from './queueGroupName';
import { Message } from 'node-nats-streaming';
import Order from '../../models/order';

export class OrderCreatedSubscriber extends Subscriber<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    // Build and save an Order instnance when onMessage is invoked
    const order = Order.build({
      id: data.id,
      price: data.ticket.price,
      status: data.status,
      userId: data.userId,
      version: data.version,
    });

    await order.save();

    // msg acknowledgement
    msg.ack();
  }
}
