import { Message } from 'node-nats-streaming';
import { Subscriber, TicketCreatedEvent, Subjects } from '@torressam/common';

export class TicketCreatedSubscriber extends Subscriber<TicketCreatedEvent> {
  readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = 'payments-service-queue-group';

  onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    console.log('Event data', data);

    console.log(data.id);
    console.log(data.title);
    console.log(data.price);

    // If event is properly received
    msg.ack();
  }
}
