import express from 'express';

const signoutRouter = express.Router();

signoutRouter.post('/api/users/signout', async (req, res) => {
  res.send('signed out');
});

export default signoutRouter;
