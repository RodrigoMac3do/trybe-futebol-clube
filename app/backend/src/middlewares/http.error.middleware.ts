import { ErrorRequestHandler } from 'express';
import HttpException from '../utils/http.exception';

const httpErrorMiddleware: ErrorRequestHandler = (err, _req, res, next) => {
  const { status, message } = err as HttpException;

  res.status(status || 500).json({ message });

  next();
};

export default httpErrorMiddleware;
