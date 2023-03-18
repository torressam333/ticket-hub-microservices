import { Subscriber } from './BaseSubscriber';
import { Message } from 'node-nats-streaming';

export class TicketCreatedSubscriber extends Subscriber {
  subject = 'ticket:created';
  queueGroupName = 'payments-service-queue-group';

  onMessage(data: any, msg: Message) {
    console.log('Event data', data);

    // If event is properly received
    msg.ack();
  }
}
