import express, { Request, Response } from 'express';
import {
  requireAuth,
  NotFoundError,
  UnauthorizedError,
} from '@torressam/common';
import Order, { OrderStatus } from '../models/order';
import { natsWrapper } from '../NatsWrapper';
import { OrderCancelledPublisher } from '../events/publishers/OrderCancelledPublisher';

const deleteOrderRouter = express.Router();

deleteOrderRouter.delete(
  '/api/orders/:orderId',
  requireAuth,
  async (req: Request, res: Response) => {
    // Find specific order
    const { orderId } = req.params;
    const order = await Order.findById(orderId).populate('ticket');

    // Order not found
    if (!order) throw new NotFoundError();

    // Incorrect user trying to access this order
    if (order.userId !== req.currentUser!.id)
      throw new UnauthorizedError('Not authorized to view order');

    // Update order status to be cancelled (soft delete-esque)
    order.status = OrderStatus.Cancelled;

    // Persist updated order
    await order.save();

    // TODO: Publish event notifying down stream services
    new OrderCancelledPublisher(natsWrapper.client).publish({
      id: order.id,
      ticket: {
        id: order?.ticket?.id,
        price: order?.ticket?.price,
      },
    });

    // Send back updated order
    res.status(204).send(order);
  }
);

export default deleteOrderRouter;
