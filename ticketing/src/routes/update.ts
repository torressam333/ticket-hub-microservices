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
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
      .not()
      .isEmpty()
      .isFloat({ gt: 0 })
      .withMessage('A valid price is required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) throw new NotFoundError();

    // Ensure ticket belongs to logged in user
    if (ticket.userId !== req.currentUser!.id)
      throw new UnauthorizedError('Not authorized to perform this action');

    // Update ticket in memory
    ticket.set({
      title: req.body.title,
      price: req.body.price,
    });

    // Persist to Mongodb
    await ticket.save();

    res.status(200).json(ticket);
  }
);

export default updateRouter;
