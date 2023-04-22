export enum OrderStatus {
  // When order has been created but ticket has not been reserved
  Created = 'created',
  // When the ticket has already been reserved or explicitelt cancelled by user
  // or if order expires before payment
  Cancelled = 'cancelled',
  // When order has successfully reserved ticket
  AwaitingPayment = 'awaiting:payment',
  // When order has reserved ticket and user pays
  Complete = 'complete',
}
