import { ValidationError } from 'express-validator';

/**
 * Class is meant to be used as a generic conduit for any
 * request errors passed to it. This helps to standardize
 * request errors sent to the user/front-end.
 *
 * Example usage: throw new RequestValidationError(errors);
 * errors can be errors coming from any request object
 */
export class RequestValidationError extends Error {
  constructor(public errors: ValidationError[]) {
    // Must invoke parent constructor
    super();

    // Must do this to get RVE class to work properly since this class extends a BUILT IN class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
}
