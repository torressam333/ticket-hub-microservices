import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';
import User from '../models/user';
import { BadRequestError } from '../errors/BadRequestError';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken';

const signInRouter = express.Router();

const validationArr = [
  body('email').isEmail().withMessage('Email must be valid'),
  body('password').trim().notEmpty().withMessage('Invalid password'),
];

signInRouter.post(
  '/api/users/signin',
  validationArr,
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    // Run query to check for user
    const existingUser = await User.findOne({ email });

    if (!existingUser) throw new BadRequestError('Invalid credentials');

    // Compare pw's - returns bool
    const pwIsValid = await Password.compare(existingUser.password, password);

    // Non matching pw's - bail out
    if (!pwIsValid) throw new BadRequestError('Invalid credentials');

    // Creds are good? Send back jwt to user
    const userJwt = jwt.sign(
      { id: existingUser.id, email: existingUser.email },
      process.env.JWT_KEY!
    );

    // Store jwt on session obj
    req.session = {
      jwt: userJwt,
    };

    // Return response w/ user
    res.status(200).json(existingUser);
  }
);

export default signInRouter;
