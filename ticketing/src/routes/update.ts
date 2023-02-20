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
    const { id } = req.params;
    const ticket = await Ticket.findById(id);

    if (!ticket) throw new NotFoundError();

    res.send(ticket);
  }
);

export default updateRouter;
