import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

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
    if (!errors.isEmpty()) throw new Error('Invalid email or password');

    console.log('creating user...');

    //throw new Error('DB Has failed to load...');

    res.send({});
  }
);

export default signUpRouter;
