import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@torressam/common';
import { body } from 'express-validator';
import Ticket from '../models/ticket';
import { TicketCreatedPublisher } from '../events/publishers/TicketCreatedPublisher';
import { natsWrapper } from '../NatsWrapper';

const newTicketRouter = express.Router();

newTicketRouter.post(
  '/api/tickets',
  requireAuth,
  [body('title').notEmpty().withMessage('Title is required')],
  [
    body('price')
      .notEmpty()
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    try {
      const { title, price } = req.body;

      const ticket = Ticket.build({
        title,
        price,
        userId: req.currentUser!.id,
      });

      // Save to mongoDB
      await ticket.save();

      // Publish event telling other services that new ticket is created
      await new TicketCreatedPublisher(natsWrapper.client).publish({
        id: ticket.id,
        version: ticket.version,
        title: ticket.title,
        price: ticket.price,
        userId: ticket.userId,
      });

      res.status(201).json(ticket);
    } catch (error) {}
  }
);

export default newTicketRouter;
