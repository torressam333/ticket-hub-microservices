import { Subjects } from './subjects';

// Set up tight coupling (Subject -> Data Shape For a Ticket)
export interface TicketUpdatedEvent {
  subject: Subjects.TicketUpdated;
  data: {
    id: string;
    version: number;
    title: string;
    price: number;
    userId: string;
  };
}
