import express, { Request, Response } from 'express';
import { NotFoundError, requireAuth, validateRequest } from '@torressam/common';
import { body } from 'express-validator';
import mongoose from 'mongoose';
import Ticket from '../models/ticket';
import Order from '../models/order';

const newOrderRouter = express.Router();

newOrderRouter.post(
  '/api/orders',
  requireAuth,
  [
    body('ticketId')
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage('TicketID is required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { ticketId } = req.body;

    // 1. Find ticket in DB that user is trying to order
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) throw new NotFoundError();

    // 2. Make sure ticket is not already reserved

    // 3. Calculate exp date for the order (15 mins max)

    // 4. Build the order and save to DB

    // 5. Emit event to other services that an order has been created
  }
);

export default newOrderRouter;
