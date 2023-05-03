import { Publisher, OrderCancelledEvent, Subjects } from '@torressam/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
