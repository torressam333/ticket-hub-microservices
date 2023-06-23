import express, { Request, Response } from 'express';
import Ticket from '../models/ticket';

const indexTicketRouter = express.Router();

indexTicketRouter.get('/api/tickets', async (req: Request, res: Response) => {
  try {
    // TODO: Add filtering based on availability
    const tickets = await Ticket.find({
      orderId: undefined,
    });

    res.status(200).json(tickets);
  } catch (error) {}
});

export default indexTicketRouter;
