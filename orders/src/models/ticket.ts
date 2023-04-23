/**
 * This ticket model contains very specific implementation details
 * belonging to the order service alont, thus, this Ticket model
 * will not and should not live in the common library
 */
import mongoose from 'mongoose';

interface TicketAttrs {}
interface TicketDoc extends mongoose.Document {}
interface TicketModel extends mongoose.Model<TicketDoc> {}
