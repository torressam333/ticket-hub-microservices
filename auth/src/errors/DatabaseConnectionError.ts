import { ValidationError } from 'express-validator';

/**
 * Class is meant to be used as a generic conduit for any
 * DB connection errors. This helps to standardize
 * DB errors sent to the user/front-end.
 *
 * Example usage: throw new DatabaseConnectionError(errors);
 * errors can be errors coming from any DB errors thrown.
 */
export class DatabaseConnectionError extends Error {
  reason = 'Database connection error...';
  statusCode = 503;

  constructor() {
    // Must invoke parent constructor
    super();

    // Must do this to get since this class extends a BUILT IN class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
