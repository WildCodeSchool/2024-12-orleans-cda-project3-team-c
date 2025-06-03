import { log } from 'console';
import { parse } from 'cookie';
import cookieParser from 'cookie-parser';
import type { NextFunction } from 'express';
import * as jose from 'jose';
import type { DefaultEventsMap, Socket } from 'socket.io';

import { env } from '@app/shared';

env();
const FRONTEND_HOST = process.env.FRONTEND_HOST ?? '';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const accessTokenSecret = new TextEncoder().encode(ACCESS_TOKEN_SECRET);

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const refreshTokenSecret = new TextEncoder().encode(REFRESH_TOKEN_SECRET);

export default async function socketAuthMiddleaxre(
  socket: Socket<DefaultEventsMap, DefaultEventsMap>,
  next: NextFunction,
) {
  let accessToken = '';
  if (socket.handshake.headers.cookie !== undefined) {
    const cookies = parse(socket.handshake.headers.cookie);

    if (cookies.accessToken !== undefined) {
      const signedAccessTokenParts = cookies.accessToken.split('s:');
      const signedAccessToken = signedAccessTokenParts.pop()?.split('.');

      if (signedAccessToken !== undefined) {
        signedAccessToken.pop();
        accessToken = signedAccessToken.join('.');
      }

      try {
        const { payload } = await jose.jwtVerify<{ userId: number }>(
          accessToken,
          accessTokenSecret,
          { audience: FRONTEND_HOST, issuer: FRONTEND_HOST },
        );
      } catch (error) {
        console.error(error);
        return;
      }
    }
  }
  next();
}
