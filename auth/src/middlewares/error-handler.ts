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
    // Extract properties from ValidationError in RVE class
    const formattedErrors = err.errors.map((error) => {
      return { message: error.msg, field: error.param };
    });

    // Return object with standardized format as {errors: [{}]}
    return res.status(400).send({ errors: formattedErrors });
  }

  if (err instanceof DatabaseConnectionError) {
    // Same standardized error format
    return res.status(503).send({
      // Reason exists in DCE class as a property
      errors: [{ message: err.reason }],
    });
  }

  // Fallback generic error
  res.status(400).send({ errors: [{ message: err.message }] });
};
