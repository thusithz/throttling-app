import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import logger from './logger';

function getStack(err: Error) {
  return {
    stack: process.env.NODE_ENV === 'production' ? '' : err.stack,
  };
}
// eslint-disable-next-line
const errorHandler: ErrorRequestHandler = function (
  err,
  req,
  res,
  // eslint-disable-next-line
  next,
) {
  //logging errors
  logger.error(`errorHandler : ${req.ip}, ${err}`);

  if (typeof err === 'string') {
    // custom application error
    return res.status(400).json({ message: err });
  }

  if (err.name === 'ValidationError') {
    // mongoose validation error
    return res.status(400).json({ message: err.message, ...getStack(err) });
  }

  if (err.name === 'UnauthorizedError') {
    // jwt authentication error
    return res.status(401).json({ message: 'Invalid Token', ...getStack(err) });
  }

  return res.status(500).json({ message: err.message, ...getStack(err) });
};

function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`Not Found - ${req.originalUrl}`);
  next(error);
}

export default { notFound, errorHandler };
