import argon2 from 'argon2';
import type { Request, Response } from 'express';
import express from 'express';
import * as jose from 'jose';

import { env } from '@app/shared';

import userModel from '@/models/user-model';

env();

const loginRouter = express.Router();

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const FRONTEND_HOST = process.env.FRONTEND_HOST ?? '';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const accessTokenSecret = new TextEncoder().encode(ACCESS_TOKEN_SECRET);

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const refreshTokenSecret = new TextEncoder().encode(REFRESH_TOKEN_SECRET);

// POST LOGIN**************************************************

loginRouter.post('/', async function (req: Request, res: Response) {
  try {
    const { email, password }: { email: string; password: string } = req.body;

    if (!email.length || !password.length) {
      res.status(400).json({ message: 'All inputs are required' });
      return;
    }

    const userAccess = await userModel.userLogin(email);
    if (!userAccess) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    const isPasswordValid = await argon2.verify(userAccess.password, password);

    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: userPassword, ...restUser } = userAccess;

    //Access token
    const accessToken = await new jose.SignJWT({
      sub: email,
      userId: restUser.id,
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

    //Refresh token
    const refreshToken = await new jose.SignJWT({
      sub: email,
      userId: restUser.id,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setIssuer(FRONTEND_HOST)
      .setAudience(FRONTEND_HOST)
      .setExpirationTime('7d')
      .sign(refreshTokenSecret);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      signed: true,
      secure: IS_PRODUCTION,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7 * 1000,
    });

    res.json({
      ok: true,
      message: 'Login successful',
      user: restUser,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === 'Invalid email or password'
    ) {
      res.status(401).json({ message: error.message });
    } else {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal login server error' });
    }
  }
});

export default loginRouter;
