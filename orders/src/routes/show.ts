import express, { Request, Response } from 'express';

const showOrderRouter = express.Router();

showOrderRouter.get(
  '/api/orders/:orderId',
  async (req: Request, res: Response) => {
    res.send('show show show');
  }
);

export default showOrderRouter;
