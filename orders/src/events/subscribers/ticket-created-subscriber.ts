import { natsWrapper } from '../../NatsWrapper';
import { Message } from 'node-nats-streaming';
import { Subjects, Subscriber, TicketCreatedEvent } from '@torressam/common';
import Ticket from '../../models/ticket';
import { queueGroupName } from './queueGroupName';

export class TicketCreatedSubscriber extends Subscriber<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = queueGroupName;

  onMessage(data: TicketCreatedEvent['data'], msg: Message): void {
    // TO do pass up data
  }
}
