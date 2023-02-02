import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../errors/UnauthorizedError';

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser)
    throw new UnauthorizedError('Not authorized to view this resouece');

  // All good? Move on to next mw || route handler
  next();
};
