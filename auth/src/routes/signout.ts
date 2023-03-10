import express from 'express';

const signoutRouter = express.Router();

signoutRouter.post('/api/users/signout', async (req, res) => {
  // Empty cookie and session info
  req.session = null;

  res.status(200).send({});
});

export default signoutRouter;
