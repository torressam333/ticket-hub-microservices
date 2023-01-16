/**
 * Determine if a there is a currently signed in user
 * w/ a valid jwt (cookie)
 */
import express from 'express';
import jwt from 'jsonwebtoken';
import { currentUser } from '../middlewares/current-user';

const currentUserRouter = express.Router();

currentUserRouter.get(
  '/api/users/currentUser',
  currentUser,
  async (req, res) => {
    // Return res w/ currentUser off of req (set in mw)
    res.status(200).json({ currentUser: req.currentUser || null });
  }
);

export default currentUserRouter;
