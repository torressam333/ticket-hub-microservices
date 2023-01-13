import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/RequestValidationError';

const signInRouter = express.Router();

const validationArr = [
  body('email').isEmail().withMessage('Email must be valid'),
  body('password').trim().notEmpty().withMessage('Invalid password'),
];

signInRouter.post(
  '/api/users/signin',
  validationArr,
  async (req: Request, res: Response) => {
    // May contain errors
    const errors = validationResult(req);

    // Send potential erros in response
    if (!errors.isEmpty()) throw new RequestValidationError(errors.array());
  }
);

export default signInRouter;
