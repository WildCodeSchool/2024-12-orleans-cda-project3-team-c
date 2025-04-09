import express from 'express';
import * as jose from 'jose';

import { userLogin } from '@/models/login';
import { userRegister } from '@/models/register';

const loginRouter = express.Router();
const registerRouter = express.Router();

const FRONTEND_HOST = process.env.FRONTEND_HOST ?? '';

const JWT_SECRET = process.env.JWT_SECRET;

const secret = new TextEncoder().encode(JWT_SECRET);

// POST REGISTER**************************************************

registerRouter.post('/', async function (req, res) {
  try {
    const { email, username, password } = req.body;

    const result = await userRegister(email, username, password);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal register server error' });
  }
});

// POST LOGIN**************************************************
loginRouter.post('/', async function (req, res) {
  try {
    const { email, password } = req.body;

    const userAccess = await userLogin(email, password);

    const token = await new jose.SignJWT({ sub: email })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setIssuer(FRONTEND_HOST)
      .setAudience(FRONTEND_HOST)
      .setExpirationTime('2h')
      .sign(secret);

    res.cookie('token', token);
    console.log('token', token);

    res.json(userAccess);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal login server error' });
  }
});

// GET **************************************************

loginRouter.get('/:id', function (req, res) {
  res.send('login get');
});

// UPDATE **************************************************

loginRouter.put('/', function (req, res) {
  res.send('login put');
});

// DELETE **************************************************

loginRouter.delete('/:id', function (req, res) {
  res.send('login delete');
});

export default [loginRouter, registerRouter];
