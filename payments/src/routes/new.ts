/**
 * Create new "Charge" record/object in DB
 */
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  requireAuth,
  validateRequest,
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
  OrderStatus,
} from '@torressam/common';
import Order, { OrderDoc } from '../models/order';
import { stripe } from '../stripe';
import Payment from '../models/payment';
import { PaymentCreatedPublisher } from '../events/publishers/PaymentCreatedPublisher';
import { natsWrapper } from '../NatsWrapper';

const createChargeRouter = express.Router();

createChargeRouter.post(
  '/api/payments',
  requireAuth,
  [
    body('token').not().isEmpty().withMessage('stripe token is required'),
    body('orderId').not().isEmpty().withMessage('orderId is required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { token, orderId } = req.body;

    // Find associated order
    const order = await Order.findById(orderId);

    // Validate req and order (order! === ts thinks it may be null
    // but in this helper method call I have a check for that)
    _validateRequestOrder(order!, req);

    // Time to bill the cc if above errors aren't thrown
    // Stripe expects cents
    const priceInCents = order!.price * 100;

    // Create charge from api call to stripe (store resp)
    const charge = await _makeStripeApiCall(priceInCents, 'usd', token);

    // Create payment instantiation using charge id
    const payment = Payment.build({ orderId, stripeId: charge.id });

    // Store payment to payment table in db
    await payment.save();

    // Publish payment created event for other services to listen for
    await new PaymentCreatedPublisher(natsWrapper.client).publish({
      id: payment.id,
      // Best to use latest orderId off payment record instead of from initial request (orderId, stripeId) since they can change or be altered at some point
      orderId: payment.orderId,
      stripeId: payment.stripeId,
    });

    // Send back persisted payment
    res.status(201).send(payment);
  }
);

const _validateRequestOrder = (order: OrderDoc, req: Request) => {
  // Err if no order
  if (!order) throw new NotFoundError();

  // check if user paying has same userid on the relevant order
  if (order.userId !== req.currentUser!.id)
    throw new UnauthorizedError('Unauthorized to perform this action');

  // Check that order is not yet cancelled
  if (order.status === OrderStatus.Cancelled)
    throw new BadRequestError(
      'Order has been canclled and payment will not be accepted'
    );
};

/**
 *
 * @param amount
 * @param currency
 * @param source
 * @returns
 */
const _makeStripeApiCall = async (
  amount: number,
  currency: string,
  source: string
) => {
  try {
    const response = await stripe.charges.create({
      amount,
      currency,
      source,
    });

    // Stripe returns resp obj as top level object
    return response;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default createChargeRouter;
