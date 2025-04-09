import argon2 from 'argon2';
import express from 'express';
import * as jose from 'jose';
import { sql } from 'kysely';

import { db } from '@app/backend-shared';

const loginRouter = express.Router();

const FRONTEND_HOST = process.env.FRONTEND_HOST ?? '';

loginRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'email and password required' });
    }

    const result = await sql`
  SELECT * FROM user WHERE user.email = ${email}
  `.execute(db);

    const user = result.rows[0];

    if (!user) {
      res.json({ message: 'user or password incorrect' });
      return;
    }

    const isPasswordValide = await argon2.verify(user.password, password);

    if (!isPasswordValide) {
      res.json({ message: 'user or password incorrect' });
      return;
    }

    new jose.SignJWT({
      sub: email,
    })
      .setProtectedHeader({
        alg: 'HS256',
      })
      .setIssuedAt()
      .setIssuer(FRONTEND_HOST)
      .setAudience(FRONTEND_HOST);

    res.json({
      message: 'User logged in',
    });
  } catch (error) {
    console.log(error);
    res.status(400);
  }
});

export default loginRouter;
