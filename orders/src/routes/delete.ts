import express, { Request, Response } from 'express';

const deleteOrderRouter = express.Router();

deleteOrderRouter.delete(
  '/api/orders/:orderId',
  async (req: Request, res: Response) => {
    res.send('delete delete delete');
  }
);

export default deleteOrderRouter;
