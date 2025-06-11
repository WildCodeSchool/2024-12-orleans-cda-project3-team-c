import express from 'express';

import userModel from '@/models/user-model';

const registerRouter = express.Router();

// POST **************************************************
registerRouter.post('/', async function (req, res) {
  try {
    const {
      email,
      username,
      password,
    }: { email: string; username: string; password: string } = req.body;

    const errors: {
      email?: string;
      username?: string;
      password?: string;
    } = {};

    if (email === '') {
      errors.email = 'Email is required';
    } else if (/!^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
      errors.email = 'Email is invalid';
    }

    if (username === '') {
      errors.username = 'Username is required';
    } else if (username.length < 3 || username.length > 30) {
      errors.username = 'Username should be between 3 and 30 characters';
    } else if (!/[a-zA-Z]/.test(username)) {
      errors.username = 'Username should contain at least one letter';
    } else if (/[^a-zA-Z1-9.\-_();]/.test(username)) {
      errors.username =
        'Username can only contain letters, numbers, and .-_();';
    }

    if (password === '') {
      errors.password = 'Password is required';
    } else if (password.length < 8) {
      errors.password = 'Password should be at least 8 characters long';
    }

    const checkIfAlreadyExists =
      await userModel.checkIfCredentialsAlreadyExists(email, username);

    if (!(typeof checkIfAlreadyExists === 'boolean')) {
      if (checkIfAlreadyExists.email !== undefined) {
        errors.email = checkIfAlreadyExists.email;
      }
      if (checkIfAlreadyExists.username !== undefined) {
        errors.username = checkIfAlreadyExists.username;
      }
    }

    if (Object.keys(errors).length) {
      res.status(400).json(errors);
      return;
    }

    await userModel.userRegister(email, username, password);
    res.status(201).json({});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal register server error' });
  }
});

export default registerRouter;
