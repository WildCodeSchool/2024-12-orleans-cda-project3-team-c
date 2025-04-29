import type { NextFunction, Request, Response } from 'express';
import * as jose from 'jose';

import { env } from '@app/shared';

const FRONTEND_HOST = process.env.FRONTEND_HOST ?? '';

env();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const accessTokenSecret = new TextEncoder().encode(ACCESS_TOKEN_SECRET);

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const refreshTokenSecret = new TextEncoder().encode(REFRESH_TOKEN_SECRET);

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Check if the request has a signed cookie named accessToken
  const accessToken = req.signedCookies.accessToken;

  if (accessToken === undefined) {
    console.error('accessToken is missing in signed cookies');
    res.status(401).json({ ok: false, message: 'accessToken is missing' });
    return;
  }

  try {
    // Verify the access token and extract the payload
    const { payload } = await jose.jwtVerify<{ userId: number }>(
      accessToken,
      accessTokenSecret,
      {
        audience: FRONTEND_HOST,
        issuer: FRONTEND_HOST,
      },
    );

    // If the access token is valid:

    req.isAuthenticated = true;
    req.userId = payload.userId;
  } catch (_aterror) {
    // If the access token is invalid, we check if the refresh token is present
    const refreshToken = req.signedCookies.refreshToken;

    try {
      const { payload } = await jose.jwtVerify<{ userId: number }>(
        refreshToken,
        refreshTokenSecret,
        {
          audience: FRONTEND_HOST,
          issuer: FRONTEND_HOST,
        },
      );

      // If the refresh token is valid, we  create a new access token and set it in the cookie

      const newAccessToken = await new jose.SignJWT({
        sub: payload.sub,
        userId: payload.userId,
      })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setIssuer(FRONTEND_HOST)
        .setAudience(FRONTEND_HOST)
        .setExpirationTime('60s')
        .sign(accessTokenSecret);

      res.cookie('newAccessToken', newAccessToken, {
        httpOnly: true,
        signed: true,
        // secure: true,
        // sameSite: 'strict',
      });

      req.isAuthenticated = true;
      req.userId = payload.userId;
    } catch (_rterror) {
      res.status(401).json({ ok: false, message: 'refreshToken is invalid' });

      // If the refresh token is invalid,
      req.isAuthenticated = false;
    }
  }

  next();
}
