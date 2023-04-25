/**
 * This ticket model contains very specific implementation details
 * belonging to the order service alont, thus, this Ticket model
 * will not and should not live in the common library
 */
import mongoose from 'mongoose';
import Order, { OrderStatus } from './order';

interface TicketAttrs {
  title: string;
  price: number;
}

export interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  isReserved(): Promise<boolean>;
}

interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
}

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

// Add build method as static on this schema (model) directly
ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket(attrs);
};

// Add isReserved to ticket *Document* not model itself
ticketSchema.methods.isReserved = async function () {
  const existingOrder = await Order.findOne({
    ticket: this,
    status: {
      $in: [
        OrderStatus.created,
        OrderStatus.AwaitingPayment,
        OrderStatus.complete,
      ],
    },
  });

  return !!existingOrder;
};

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema);

export default Ticket;
