import { CustomError } from './customError';

export class BadRequestError extends CustomError {
  statusCode = 400;
  constructor(message: string) {
    super('Bad request');

    this.message = message;

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
