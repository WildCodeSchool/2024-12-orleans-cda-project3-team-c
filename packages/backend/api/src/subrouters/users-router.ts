import express from 'express';

import userModel from '@/models/user-model';

const usersRouter = express.Router();

// GET **************************************************
usersRouter.get('/:param', async (req, res) => {
  const { param } = req.params;

  if (!isNaN(Number(param))) {
    try {
      const userIdNumber = Number(param);
      const user = await userModel.getUserById(userIdNumber);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('Error getting user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(400).json({ error: 'Username lookup not implemented' });
  }
});

usersRouter.get('/:id/posts', function () {
  // Getting posts from a specified user
});

usersRouter.get('/tag/:tag', function () {
  // Getting posts from a specified tag
});

// POST **************************************************

// UPDATE **************************************************

// DELETE **************************************************
export default usersRouter;
