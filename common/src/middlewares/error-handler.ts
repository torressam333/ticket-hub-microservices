import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/customError';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // All error classes will technically be an instance of the CustomError class via inheritence
  if (err instanceof CustomError) {
    // Return object with standardized format as {errors: [{}]}
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  console.error(err);

  // Fallback generic error
  res.status(400).send({ errors: [{ message: err.message }] });
};
