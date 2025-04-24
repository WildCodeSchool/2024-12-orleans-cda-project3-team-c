import argon2 from 'argon2';
import { type Request, Router } from 'express';
import * as jose from 'jose';

import { env } from '@app/shared';

import { getUserById, userLogin } from '@/models/user-model';

env();

const userLoginRouter = Router();

export const cookieRouterGet = Router();

declare module 'Express' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Request {
    userId?: number;
  }
}

const FRONTEND_HOST = process.env.FRONTEND_HOST ?? '';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const accessTokenSecret = new TextEncoder().encode(ACCESS_TOKEN_SECRET);

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const refreshTokenSecret = new TextEncoder().encode(REFRESH_TOKEN_SECRET);

// POST LOGIN**************************************************

userLoginRouter.post('/', async function (req, res) {
  try {
    const { email, password } = req.body;

    const userAccess = await userLogin(email, password);
    if (!userAccess) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await argon2.verify(userAccess.password, password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
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
      // secure: true,
      // sameSite: 'strict',
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
      // secure: true,
      // sameSite: 'strict',
    });

    res.json({
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

// GET COOKIES **************************************************

cookieRouterGet.get('/', async function (req: Request, res) {
  try {
    const userId = req.userId;

    if (userId === undefined) {
      res.json({ ok: 'false' });
      return;
    }

    const user = await getUserById(userId);

    if (!user) {
      res.json({ ok: 'false' });
      return;
    }
    res.json({ user, ok: 'true' });
  } catch (error) {
    console.error(error);
    res.json(
      'not authorized, please login to get your token or check your cookies',
    );
    return;
  }
});

// GET **************************************************

userLoginRouter.get('/:id', function (req, res) {
  res.send('login get');
});

export default userLoginRouter;
