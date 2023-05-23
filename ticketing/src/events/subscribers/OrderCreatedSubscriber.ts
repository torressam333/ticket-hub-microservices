/**
 * Subscribes to when an order is created in order to act on
 * the ticket involved in the order
 *
 * locking a ticket, setting a time until expiration etc...
 */
import { OrderCreatedEvent, Subscriber, Subjects } from '@torressam/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queueGroupName';
import Ticket from '../../models/ticket';
import { TicketUpdatedPublisher } from '../publishers/TicketUpdatedPublisher';

export class OrderCreatedSubscriber extends Subscriber<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    // Find the ticket that order is reserving
    const ticket = await Ticket.findById(data.ticket.id);

    // If no ticket, error out
    if (!ticket) throw new Error('Ticket not found');

    // Mark ticket as being reserved by setting order id property
    ticket.set({ orderId: data.id });

    // Save ticket
    await ticket.save();

    // Publish event downstream
    new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      version: ticket.version,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      orderId: ticket.orderId,
    });

    // Ack the message
    msg.ack();
  }
}
