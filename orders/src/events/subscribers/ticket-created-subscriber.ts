import { Message } from 'node-nats-streaming';
import { Subjects, Subscriber, TicketCreatedEvent } from '@torressam/common';
import Ticket from '../../models/ticket';
import { queueGroupName } from './queueGroupName';

export class TicketCreatedSubscriber extends Subscriber<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    const { id, title, price } = data;
    const ticket = Ticket.build({ id, title, price });

    await ticket.save();

    // No error? ack message
    msg.ack();
  }
}
