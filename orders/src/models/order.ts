import mongoose from 'mongoose';

// Properties to create an order
interface OrderAttrs {
  userId: string;
  status: string;
  expiresAt: Date;
  ticket: TicketDoc; // Is instance of ticket (referential relationship)
}

// Final set of properties when an order is created
interface OrderDoc extends mongoose.Document {
  userId: string;
  status: string;
  expiresAt: Date;
  ticket: TicketDoc;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  // Builds order document
  build(attrs: OrderAttrs): OrderDoc;
}
