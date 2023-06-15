import { Subjects, Publisher, PaymentCreatedEvent } from '@torressam/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
