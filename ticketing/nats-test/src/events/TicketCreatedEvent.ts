import { Subjects } from './subjects';

// Set up tight coupling (Subject -> Data Shape For a Ticket)
export interface TicketCreatedEvent {
  subject: Subjects.TicketCreated;
  data: {
    id: string;
    title: string;
    price: number;
  };
}
