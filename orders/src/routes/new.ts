import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@torressam/common';
import { body } from 'express-validator';
import mongoose from 'mongoose';

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
  async (req: Request, res: Response) => {}
);

export default newOrderRouter;
