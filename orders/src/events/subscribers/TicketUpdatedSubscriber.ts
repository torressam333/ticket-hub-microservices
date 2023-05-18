import { Message } from 'node-nats-streaming';
import {
  NotFoundError,
  Subjects,
  Subscriber,
  TicketUpdatedEvent,
} from '@torressam/common';
import Ticket from '../../models/ticket';
import { queueGroupName } from './queueGroupName';

export class TicketUpdatedSubscriber extends Subscriber<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: TicketUpdatedEvent['data'], msg: Message) {
    // Check Ticket Model for findByEvent implementation (making reusable on model itself)
    const ticket = await Ticket.findByEvent(data);

    if (!ticket) throw new NotFoundError();

    const { title, price } = data;

    // Update title and price
    ticket.set({
      title,
      price,
    });

    // Save updated ticket
    await ticket.save();

    // Acknowledge message for nats to process event
    msg.ack();
  }
}
