import express from 'express';

import userModel from '@/models/user-suggestion-model';

const usersRouter = express.Router();

usersRouter.get('/user-suggestion', async (req, res) => {
  try {
    const usersWithFollowers = await userModel.getAllUsersWithFollowersCount();
    res.json(usersWithFollowers);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET **************************************************
usersRouter.get('/:param', async (req, res) => {
  const { param } = req.params;

  if (!isNaN(Number(param))) {
    try {
      const userIdNumber = Number(param);
      const userWithFollowers =
        await userModel.getUserWithFollowersCount(userIdNumber);
      res.json(userWithFollowers);
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
