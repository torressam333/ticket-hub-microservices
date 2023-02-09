import express, { Request, Response } from 'express';
import { requireAuth } from '@torressam/common';

const newTicketRouter = express.Router();

newTicketRouter.post(
  '/api/tickets',
  requireAuth,
  (req: Request, res: Response) => {
    try {
      res.sendStatus(200);
    } catch (error) {}
  }
);

export default newTicketRouter;
