import express, { Request, Response } from 'express';

const indexOrderRouter = express.Router();

indexOrderRouter.get('/api/orders', async (req: Request, res: Response) => {
  res.send('Test Test Test');
});

export default indexOrderRouter;
