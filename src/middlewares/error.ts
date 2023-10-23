import {
  type NextFunction,
  type Request,
  type Response,
} from 'express';

export function errorLoggingMiddleware (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
): Response {
    console.log('👀 ERRROOOR!!', error);
    return res.status(500).json({ error: 'Something went wrong' });
}
