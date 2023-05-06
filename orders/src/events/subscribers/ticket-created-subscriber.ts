import { natsWrapper } from '../../NatsWrapper';
import { Message } from 'node-nats-streaming';
import { Subjects, Subscriber, TicketCreatedEvent } from '@torressam/common';
import Ticket from '../../models/ticket';

export class TicketCreatedSubscriber extends Subscriber<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = 'orders-service';

  onMessage(data: TicketCreatedEvent['data'], msg: Message): void {
    // TO do pass up data
  }
}
