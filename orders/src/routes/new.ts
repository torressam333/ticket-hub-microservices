import express, { Request, Response } from 'express';
import {
  NotFoundError,
  requireAuth,
  validateRequest,
  BadRequestError,
  currentUser,
} from '@torressam/common';
import { body } from 'express-validator';
import mongoose from 'mongoose';
import Ticket from '../models/ticket';
import Order, { OrderStatus } from '../models/order';
import { natsWrapper } from '../NatsWrapper';
import { OrderCreatedPublisher } from '../events/publishers/OrderCreatedPublisher';

const newOrderRouter = express.Router();
const EXPIRATION_WINDOW_SECONDS = 15 * 60;

newOrderRouter.post(
  '/api/orders',
  requireAuth,
  [
    body('ticketId')
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage('TicketID is required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { ticketId } = req.body;

    // 1. Find ticket in DB that user is trying to order
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) throw new NotFoundError();

    // 2. Make sure ticket related to a specific order is not already reserved
    const isReserved = await ticket.isReserved();

    if (isReserved)
      throw new BadRequestError('Ticket has already been reserved');

    // 3. Calculate exp date for the order (15 mins max)
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

    // 4. Build the order and save to DB
    const order = Order.build({
      userId: req.currentUser!.id,
      status: OrderStatus.Created,
      expiresAt: expiration,
      ticket,
    });

    await order.save();

    // 5. TODO: Emit event to other services that an order has been created
    new OrderCreatedPublisher(natsWrapper.client).publish({
      id: order.id,
      status: order.status,
      userId: order.userId,
      expiresAt: order.expiresAt.toISOString(),
      ticket: {
        id: ticket.id,
        price: ticket.price,
      },
    });

    // 6. Return response
    return res.status(201).send(order);
  }
);

export default newOrderRouter;
