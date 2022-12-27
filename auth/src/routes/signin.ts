import express from 'express';

const signInRouter = express.Router();

signInRouter.post('/api/users/signin', async (req, res) => {
  res.send('signed in');
});

export default signInRouter;
