import type { NextFunction } from 'express';

export default function loginMiddleware(
  _req: Request,
  _res: Response,
  next: NextFunction,
) {
  next();
}
