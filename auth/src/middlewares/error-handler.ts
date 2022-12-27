import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(
    'SAMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM TTTTTTTTTTTTTTTTTTTTTTTTTTTTTT'
  );
  // console.log({ samsError: err.message });
  // res.status(400).json({
  //   message: err.message,
  // });
};
