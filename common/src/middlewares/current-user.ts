import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
  email: string;
}

// Modify express req type def and add current user to req obj
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // No jwt? Move on to next mw which will return an error
  if (!req.session?.jwt) return next();

  try {
    // Decode jwt
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;

    // Custom property on request object
    req.currentUser = payload;
  } catch (error) {
    console.error(error);
  }

  // Continue to next mw regardless
  next();
};
