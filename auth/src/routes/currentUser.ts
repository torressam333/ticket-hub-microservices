/**
 * Determine if a there is a currently signed in user
 * w/ a valid jwt (cookie)
 */
import express from 'express';
import jwt from 'jsonwebtoken';

const currentUserRouter = express.Router();

currentUserRouter.get('/api/users/currentUser', async (req, res) => {
  // // Invalid user/jwt - bail
  if (!req.session?.jwt) return res.status(401).json({ currentUser: null });
  // If token was altered, an err will be thrown - catch it.
  try {
    // Verify jwt and grab data from jwt
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
    res.status(200).json({ currentUser: payload });
  } catch (err) {
    res.json({ currentUser: null });
  }
});

export default currentUserRouter;
