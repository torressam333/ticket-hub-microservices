import { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('hiii');

  res.status(400).json({
    message: err.message,
  });
};
