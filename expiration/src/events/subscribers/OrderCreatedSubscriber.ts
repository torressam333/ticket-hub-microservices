/**
 * Subscribes to when an order is created in order
 *
 * locking a ticket, setting a time until expiration etc...
 */
import { OrderCreatedEvent, Subscriber, Subjects } from '@torressam/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import expirationQueue from '../../queues/ExpirationQueue';

export class OrderCreatedSubscriber extends Subscriber<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    // Difference in time between expires at and now.
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();

    console.log('waiting this many ms to process job ', delay);

    // Create new job and queue it up
    await expirationQueue.add(
      {
        orderId: data.id,
      },
      {
        delay,
      }
    );

    msg.ack();
  }
}
