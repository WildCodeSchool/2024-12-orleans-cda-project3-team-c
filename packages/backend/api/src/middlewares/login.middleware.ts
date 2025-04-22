import type { NextFunction, Request, Response } from 'express';
import * as jose from 'jose';

const FRONTEND_HOST = process.env.FRONTEND_HOST ?? '';

const JWT_SECRET = process.env.JWT_SECRET;

const secret = new TextEncoder().encode(JWT_SECRET);

export default async function loginMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.signedCookies.token;

  if (!token) {
    console.error('Token is missing in signed cookies');
    res.status(401).json({ ok: false, message: 'Token is missing' });
    return;
  }

  try {
    const { payload } = await jose.jwtVerify<{ userId: number }>(
      token,
      secret,
      {
        audience: FRONTEND_HOST,
        issuer: FRONTEND_HOST,
      },
    );

    console.log('Payload:', payload);

    req.isAuthenticated = true;
    req.userId = payload.userId;
  } catch (error) {
    console.error(error);
    res.json({
      ok: false,
    });
    return;
  }

  next();
}
