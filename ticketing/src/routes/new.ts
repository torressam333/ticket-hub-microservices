import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@torressam/common';
import { body } from 'express-validator';

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
  (req: Request, res: Response) => {
    try {
      res.sendStatus(200);
    } catch (error) {}
  }
);

export default newTicketRouter;
