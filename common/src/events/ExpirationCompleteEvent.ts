import { Subjects } from './subjects';

// Only need an orderId to expire a ticket
export interface ExpirationCompleteEvent {
  subject: Subjects.ExpirationComplete;
  data: {
    orderId: string;
  };
}
