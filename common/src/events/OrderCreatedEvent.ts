import { Subjects } from './subjects';
import { OrderStatus } from './types/order-status';

// Set up tight coupling (Subject -> Data Shape For an order creation)
export interface OrderCreatedEvent {
  subject: Subjects.OrderCreated;
  data: {
    id: string;
    version: number;
    status: OrderStatus;
    userId: string;
    expiresAt: string;
    ticket: {
      id: string;
      price: number;
    };
  };
}
