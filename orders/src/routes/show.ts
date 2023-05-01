import express, { Request, Response } from 'express';
import {
  NotFoundError,
  UnauthorizedError,
  requireAuth,
} from '@torressam/common';
import Order from '../models/order';

const showOrderRouter = express.Router();

showOrderRouter.get(
  '/api/orders/:orderId',
  requireAuth,
  async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const order = await Order.findById(orderId).populate('ticket');

    // Order not found
    if (!order) throw new NotFoundError();

    // Incorrect user trying to access this order
    if (order.userId !== req.currentUser!.id)
      throw new UnauthorizedError('Not authorized to view order');

    res.status(200).send(order);
  }
);

export default showOrderRouter;
