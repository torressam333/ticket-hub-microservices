import mongoose from 'mongoose';

// Properties required to build a new Ticket
interface TicketAttrs {
  title: string;
  price: string;
}

// List of properties that a Ticket has. Final set of properties on a saved
// record might be different than what's required to create one (i.e. TicketAttrs)
interface TicketDoc extends mongoose.Document {
  title: string;
  price: string;
  // Any additional ricket properties go here
}

// Properties which are tied to/added directly on the model to be accessed
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
