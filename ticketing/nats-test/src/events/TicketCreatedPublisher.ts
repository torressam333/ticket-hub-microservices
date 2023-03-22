import { Publisher } from './BasePublisher';
import { TicketCreatedEvent } from './TicketCreatedEvent';
import { Subjects } from './subjects';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
