import { Subscriber } from './BaseSubscriber';
import { Message } from 'node-nats-streaming';
import { TicketCreatedEvent } from '../events/TicketCreatedEvent';
import { Subjects } from './subjects';

export class TicketCreatedSubscriber extends Subscriber<TicketCreatedEvent> {
  readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = 'payments-service-queue-group';

  onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    console.log('Event data', data);

    // If event is properly received
    msg.ack();
  }
}