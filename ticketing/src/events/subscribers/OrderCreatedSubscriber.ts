/**
 * Subscribes to when an order is created in order to act on
 * the ticket involved in the order
 *
 * locking a ticket, setting a time until expiration etc...
 */
import {
  OrderCreatedEvent,
  Subscriber,
  Subjects,
  OrderStatus,
} from '@torressam/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queueGroupName';

export class OrderCreatedSubscriber extends Subscriber<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    // Find the ticket that order is reserving
    // If no ticket, error out
    // Mark ticket as being reserved by setting order id property
    // Save ticket
    // Ack the message
  }
}
