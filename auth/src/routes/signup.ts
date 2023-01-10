import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/RequestValidationError';
import { BadRequestError } from '../errors/BadRequestError';
import User from '../models/user';

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

    // Check if user already exists with email
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser)
      throw new BadRequestError('Email provided is already in use');

    // Create user and persist to mongodb
    const user = User.build({ email, password });
    await user.save();

    // Return jwt to user

    // Return response w/ user
    res.status(201).send(user);
  }
);

export default signUpRouter;
