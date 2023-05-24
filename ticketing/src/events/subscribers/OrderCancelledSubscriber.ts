/**
 * Subscribes to when an order is cancelled in order to act on
 * the ticket involved and remove associated ticket id
 *
 * locking a ticket, setting a time until expiration etc...
 */
import { OrderCancelledEvent, Subscriber, Subjects } from '@torressam/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queueGroupName';
import Ticket from '../../models/ticket';
import { TicketUpdatedPublisher } from '../publishers/TicketUpdatedPublisher';

export class OrderCancelledSubscriber extends Subscriber<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
    // Find the ticket that has the assoicated order id
    const ticket = await Ticket.findById(data.ticket.id);

    // If no ticket, error out
    if (!ticket) throw new Error('Ticket not found');

    // Mark ticket as being reserved by resetting order id property
    ticket.set({ orderId: undefined });

    // Save ticket with order id removed
    await ticket.save();

    // Publish event to other services
    await new TicketUpdatedPublisher(this.client).publish({
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
