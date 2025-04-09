import argon2 from 'argon2';
import express from 'express';
import { sql } from 'kysely';

import { db } from '@app/backend-shared';

const postRegisterRouter = express.Router();

postRegisterRouter.post('/register', async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const hashedPassword = await argon2.hash(password);

    await sql`
    INSERT INTO user(email, username, password) VALUES(${email}, ${username}, ${hashedPassword})
    `.execute(db);

    res.status(201).json({ message: 'user successfully created' });
  } catch (error) {
    console.error('not user created', error);
    res.status(500).json({ error: 'internal server error' });
  }
});

export default postRegisterRouter;

// {
//   "email":"amingo@amingo.com",
//   "username":"amingo",
//   "password":"amingo"
// }
