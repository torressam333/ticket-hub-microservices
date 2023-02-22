import express, { Request, Response } from 'express';
import Ticket from '../models/ticket';
import mongoose from 'mongoose';
import { body } from 'express-validator';
import {
  NotFoundError,
  validateRequest,
  requireAuth,
  UnauthorizedError,
} from '@torressam/common';

const updateRouter = express.Router();

updateRouter.put(
  '/api/tickets/:id',
  requireAuth,
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) throw new NotFoundError();

    if (ticket.userId !== req.currentUser!.id)
      throw new UnauthorizedError('Not authorized to perform this action');

    res.send(ticket);
  }
);

export default updateRouter;
