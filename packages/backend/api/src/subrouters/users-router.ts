import express from 'express';


import { userRegister } from '@/models/user-register';



const usersRouter = express.Router();

// GET **************************************************
usersRouter.get('/:param', function () {
  // Getting a specified user from id or username
});

usersRouter.get('/:id/posts', function () {
  // Getting posts from a specified user
});

usersRouter.get('/tag/:tag', function () {
  // Getting posts from a specified tag
});

// POST **************************************************

usersRouter.post('/', async function (req, res) {
  try {
    const { email, username, password } = req.body;

    const result = await userRegister(email, username, password);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal register server error' });
  }
});

// UPDATE **************************************************

// DELETE **************************************************
export default usersRouter;
