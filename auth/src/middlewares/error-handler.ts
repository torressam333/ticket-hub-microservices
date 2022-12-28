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
    console.log('Handling rve error');
  }

  if (err instanceof DatabaseConnectionError) {
    console.log('DB error');
  }

  res.status(400).json({
    message: err.message,
  });
};
