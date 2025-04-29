import express from 'express';

import { userRegister } from '@/models/user-model';

const registerRouter = express.Router();

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

export default registerRouter;
