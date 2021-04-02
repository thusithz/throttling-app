import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';


function getStack(err: Error) {
  return {
    stack: process.env.NODE_ENV === 'production' ? '' : err.stack,
  };
}

const errorHandler : ErrorRequestHandler = function(
  err,
  req,
  res,
  next,
) {

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
}

function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`Not Found - ${req.originalUrl}`);
  next(error);
}

export default { notFound, errorHandler };
