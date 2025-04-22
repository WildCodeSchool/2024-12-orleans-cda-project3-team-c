import express from 'express';
import * as jose from 'jose';

import { db } from '@app/backend-shared';
import { env } from '@app/shared';

import loginGuards from '@/middlewares/login.guards';
import { userLogin } from '@/models/user-login';

env();

const userLoginRouter = express.Router();

export const cookkieRouterGet = express.Router();

const FRONTEND_HOST = process.env.FRONTEND_HOST ?? '';

const JWT_SECRET = process.env.JWT_SECRET;

const secret = new TextEncoder().encode(JWT_SECRET);

// POST LOGIN**************************************************

userLoginRouter.post('/', async function (req, res) {
  try {
    const { email, password } = req.body;

    const userAccess = await userLogin(email, password);

    const token = await new jose.SignJWT({
      sub: email,
      userId: userAccess.userId,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setIssuer(FRONTEND_HOST)
      .setAudience(FRONTEND_HOST)
      .setExpirationTime('60s')
      .sign(secret);

    res.cookie('token', token, {
      httpOnly: true,
      signed: true,
      // secure: true,
      // sameSite: 'strict',
    });

    res.json(userAccess);
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

cookkieRouterGet.get('/', loginGuards, async function (req, res) {
  const userId = req.userId;

  if (userId === undefined) {
    res.json({ ok: 'false' });
    return;
  }

  try {
    const user = await db
      .selectFrom('user')
      .selectAll()
      .where('user.id', '=', userId)
      .executeTakeFirst();

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

// UPDATE **************************************************

userLoginRouter.put('/', function (req, res) {
  res.send('login put');
});

// DELETE **************************************************

userLoginRouter.delete('/:id', function (req, res) {
  res.send('login delete');
});

export default userLoginRouter;
