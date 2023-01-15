import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';

const signInRouter = express.Router();

const validationArr = [
  body('email').isEmail().withMessage('Email must be valid'),
  body('password').trim().notEmpty().withMessage('Invalid password'),
];

signInRouter.post(
  '/api/users/signin',
  validationArr,
  validateRequest,
  async (req: Request, res: Response) => {}
);

export default signInRouter;
