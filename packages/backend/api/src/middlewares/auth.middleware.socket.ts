import { log } from 'console';
import { parse } from 'cookie';
import cookieParser from 'cookie-parser';
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
  next,
) {
  let accessToken;
  if (socket.handshake.headers.cookie !== undefined) {
    console.log(socket.handshake.headers.cookie);
    console.log(accessTokenSecret);
    const cookies = parse(socket.handshake.headers.cookie);
    // const cookies = cookieParser
    if (cookies.accessToken !== undefined) {
      const signedAccessTokenParts = cookies.accessToken.split('s:');
      signedAccessTokenParts.shift();
      accessToken = signedAccessTokenParts.join('');
      console.log(accessToken);
      try {
        const { payload } = await jose.jwtVerify<{ userId: number }>(
          accessToken,
          accessTokenSecret,
          { audience: FRONTEND_HOST, issuer: FRONTEND_HOST },
        );
        console.log('payload: ', payload);
      } catch (error) {
        console.error(error);
      }
    }
  }
  next();
}
