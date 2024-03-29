import { Subjects } from './subjects';

// Set up tight coupling (Subject -> Data Shape For a Ticket)
export interface TicketCreatedEvent {
  subject: Subjects.TicketCreated;
  data: {
    id: string;
    version: number;
    title: string;
    price: number;
    userId: string;
  };
}
