import { Request, Response, NextFunction } from 'express';
import { RequestValidationError } from '../errors/RequestValidationError';
import { DatabaseConnectionError } from '../errors/DatabaseConnectionError';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof RequestValidationError) {
    // Return object with standardized format as {errors: [{}]}
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  if (err instanceof DatabaseConnectionError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  // Fallback generic error
  res.status(400).send({ errors: [{ message: err.message }] });
};
