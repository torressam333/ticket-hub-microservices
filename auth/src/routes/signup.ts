import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError } from '../errors/BadRequestError';
import { validateRequest } from '../middlewares/validate-request';
import User from '../models/user';
import jwt from 'jsonwebtoken';

const signUpRouter = express.Router();

const validationArr = [
  body('email').isEmail().withMessage('Email must be valid'),
  body('password')
    .trim()
    .isLength({ min: 6, max: 20 })
    .withMessage('Password must be between 6 and 20 chars'),
];

signUpRouter.post(
  '/api/users/signup',
  validationArr,
  validateRequest,
  async (req: Request, res: Response) => {
    // Check if user already exists with email
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser)
      throw new BadRequestError('Email provided is already in use');

    // Create user and persist to mongodb
    const user = User.build({ email, password });
    await user.save();

    // Generate jwt
    const userJwt = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_KEY! // TS doesn't need to check this (see index.ts)
    );

    // Store jwt on session obj
    req.session = {
      jwt: userJwt,
    };

    // Return response w/ user
    res.status(201).json(user);
  }
);

export default signUpRouter;
