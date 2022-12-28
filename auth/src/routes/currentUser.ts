import express from 'express';

const currentUserRouter = express.Router();

currentUserRouter.get('/api/users/currentUser', async (req, res) => {
  res.send('testing testing');
});

export default currentUserRouter;
