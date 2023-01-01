import { ValidationError } from 'express-validator';
import { CustomError } from './customError';

/**
 * Class is meant to be used as a generic conduit for any
 * request errors passed to it. This helps to standardize
 * request errors sent to the user/front-end.
 *
 * Example usage: throw new RequestValidationError(errors);
 * errors can be errors coming from any request object
 */
export class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    // Must invoke parent constructor
    super('Invalid request data passed through');

    // Must do this since this class extends a BUILT IN class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((err) => {
      return { message: err.msg, field: err.param };
    });
  }
}
