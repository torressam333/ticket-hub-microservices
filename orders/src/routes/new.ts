import express, { Request, Response } from 'express';

const newOrderRouter = express.Router();

newOrderRouter.post('/api/orders', async (req: Request, res: Response) => {
  res.send('New new new');
});

export default newOrderRouter;
