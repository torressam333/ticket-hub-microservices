/**
 * Subscribes to when an order is created in order
 *
 * locking a ticket, setting a time until expiration etc...
 */
import { OrderCreatedEvent, Subscriber, Subjects } from '@torressam/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';

export class OrderCreatedSubscriber extends Subscriber<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {}
}
