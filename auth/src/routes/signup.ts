import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/RequestValidationError';
import { DatabaseConnectionError } from '../errors/DatabaseConnectionError';

const signUpRouter = express.Router();

signUpRouter.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 6, max: 20 })
      .withMessage('Password must be between 6 and 20 chars'),
  ],
  async (req: Request, res: Response) => {
    // May contain errors
    const errors = validationResult(req);

    // Send potential erros in response
    if (!errors.isEmpty()) throw new RequestValidationError(errors.array());

    console.log('creating user...');

    throw new DatabaseConnectionError();

    res.send({});
  }
);

export default signUpRouter;
