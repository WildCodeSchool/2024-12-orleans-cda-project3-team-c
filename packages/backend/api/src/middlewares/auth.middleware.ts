import type { NextFunction, Request, Response } from 'express';
import * as jose from 'jose';

import { env } from '@app/shared';

const FRONTEND_HOST = process.env.FRONTEND_HOST ?? '';

env();

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
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
      const accessToken = await new jose.SignJWT({
        sub: payload.sub,
        userId: payload.userId,
      })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setIssuer(FRONTEND_HOST)
        .setAudience(FRONTEND_HOST)
        .setExpirationTime('60s')
        .sign(accessTokenSecret);

      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        signed: true,
        secure: IS_PRODUCTION,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7 * 1000,
      });

      req.isAuthenticated = true;
      req.userId = payload.userId;
    } catch (_rterror) {
      // If the refresh token is invalid,
      req.isAuthenticated = false;
    }
  }

  next();
}
