import express, { Request, Response } from 'express';
import Ticket from '../models/ticket';
import { NotFoundError } from '@torressam/common';
import mongoose from 'mongoose';

const showTicketRouter = express.Router();

// Grab specific ticket by id
showTicketRouter.get(
  '/api/tickets/:id',
  async (req: Request, res: Response) => {
    const ticketId = req.params.id;

    // Validate id
    if (!mongoose.isValidObjectId(ticketId)) throw new NotFoundError();

    const ticket = await Ticket.findById(ticketId);

    // Handle non-existent ticket
    if (!ticket) throw new NotFoundError();

    return res.status(200).send(ticket);
  }
);

export default showTicketRouter;
