import { ErrorRequestHandler } from 'express';
import HttpException from '../utils/HttpException';

export default class HttpError {
  public static handle: ErrorRequestHandler = (err, _req, res, next) => {
    const { status, message } = err as HttpException;

    res.status(status || 500).json({ message });

    next();
  };
}
