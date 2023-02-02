/**
 * Custom auth error to be thrown when
 * user tries to access somethign they don't
 * have access to.
 */
import { CustomError } from './customError';

export class UnauthorizedError extends CustomError {
  statusCode = 401;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
