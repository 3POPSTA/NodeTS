import { Request, Response, NextFunction } from 'express';

type AsyncRequestHandler = (request: Request, response: Response, next: NextFunction) => Promise<any>;

export const catchAsync = (fn: AsyncRequestHandler) => {
  return (request: Request, response: Response, next: NextFunction): void => {
    fn(request, response, next).catch(next);
  };
};

export default { catchAsync };
module.exports = { catchAsync };
