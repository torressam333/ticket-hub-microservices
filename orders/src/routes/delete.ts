import express, { Request, Response } from 'express';
import {
  requireAuth,
  NotFoundError,
  UnauthorizedError,
} from '@torressam/common';
import Order, { OrderStatus } from '../models/order';

const deleteOrderRouter = express.Router();

deleteOrderRouter.delete(
  '/api/orders/:orderId',
  requireAuth,
  async (req: Request, res: Response) => {
    // Find specific order
    const { orderId } = req.params;
    const order = await Order.findById(orderId);

    // Order not found
    if (!order) throw new NotFoundError();

    // Incorrect user trying to access this order
    if (order.userId !== req.currentUser!.id)
      throw new UnauthorizedError('Not authorized to view order');

    // Update order status to be cancelled (soft delete-esque)
    order.status = OrderStatus.Cancelled;

    // Persist updated order
    await order.save();

    res.status(204).send(order);
  }
);

export default deleteOrderRouter;
