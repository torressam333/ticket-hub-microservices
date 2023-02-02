/**
 * Reusable mw for checking/responding to invalid requests
 */

import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/RequestValidationError';

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Grab errors from request (if any)
  const errors = validationResult(req);

  // Check for errors
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  // No errors? Move on...
  next();
};
