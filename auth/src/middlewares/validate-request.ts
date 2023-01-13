/**
 * Reusable mw for checking invalid requests
 */

import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/RequestValidationError';

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
