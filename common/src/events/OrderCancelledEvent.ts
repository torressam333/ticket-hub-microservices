import { Subjects } from './subjects';
import { OrderStatus } from './types/order-status';

// Set up tight coupling (Subject -> Data Shape For an Order cancellation)
export interface OrderCancelledEvent {
  subject: Subjects.OrderCancelled;
  data: {
    id: string;
    ticket: {
      id: string;
      price: number;
    };
  };
}
