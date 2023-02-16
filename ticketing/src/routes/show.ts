import express, { Request, Response } from 'express';
import Ticket from '../models/ticket';
import { param } from 'express-validator';
import { validateRequest, NotFoundError } from '@torressam/common';

const showTicketRouter = express.Router();

showTicketRouter.get(
  '/api/tickets/:id',
  [param('id').notEmpty().isNumeric().withMessage('Ticket id is required')],
  validateRequest,
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) throw new NotFoundError();
    res.send(ticket);
  }
);

export default showTicketRouter;
