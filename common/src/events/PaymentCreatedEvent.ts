import { Subjects } from './subjects';

// Set up strict Data Shape For an payment creation)
export interface PaymentCreatedEvent {
  subject: Subjects.PaymentCreated;
  data: {
    id: string;
    orderId: string;
    stripeId: string;
  };
}
