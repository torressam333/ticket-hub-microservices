import express, { Request, Response } from 'express';
import { requireAuth } from '@torressam/common';
import Order from '../models/order';

const indexOrderRouter = express.Router();

indexOrderRouter.get(
  '/api/orders',
  requireAuth,
  async (req: Request, res: Response) => {
    // Find all orders belonging to user along with relevant ticket
    const orders = await Order.find({ userId: req.currentUser!.id }).populate(
      'ticket'
    );

    return res.status(200).send(orders);
  }
);

export default indexOrderRouter;
