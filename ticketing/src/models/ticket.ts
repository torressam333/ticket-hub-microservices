import mongoose from 'mongoose';

// Interface to describe attributes required for a new instantiation of a ticket
interface TicketAttrs {
  title: string;
  price: string;
}

// Interface to describe properties that a single instance of a Ticket has.
interface TicketDoc extends mongoose.Document {
  title: string;
  price: string;
  // Any additional ricket properties go here
}

// Interface to describe props/shape of the Ticket Model Collection
// Along with any addtional methods the Ticket model should have
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
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(_, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

// Way to implement TS interface with mongoose model via custom function
// Now we can call: Ticket.build({}) since custom fn was added to statics list
ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket(attrs);
};

// Initial Ticket modelb bootstrapping w/ interfaces implemented. (<Collectionname>, <CollectionSchema>)
const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema);

export default Ticket;
