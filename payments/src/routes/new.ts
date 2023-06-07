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
} from '@torressam/common';
import Order from '../models/order';

const createChargeRouter = express.Router();

createChargeRouter.post(
  '/api/payments',
  requireAuth,
  [
    body('token').not().isEmpty().withMessage('stripe token is required'),
    body('orderId').not().isEmpty().withMessage('orderId is required'),
  ],
  async (req: Request, res: Response) => {
    res.send({ success: true });
  }
);

export default createChargeRouter;
