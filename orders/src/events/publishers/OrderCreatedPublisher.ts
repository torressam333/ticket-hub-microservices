import { Publisher, OrderCreatedEvent, Subjects } from '@torressam/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
