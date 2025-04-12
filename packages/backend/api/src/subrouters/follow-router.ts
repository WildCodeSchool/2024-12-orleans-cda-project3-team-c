import express from 'express';

import followModel from '@/models/follow-model';

const followsRouter = express.Router();

// GET /follows/:id/followers
followsRouter.get('/:id/followers', async (req, res) => {
  const userId = +req.params.id;
  if (!userId) {
    res.status(400).send('Invalid user ID');
    return;
  }

  const count = await followModel.getFollowersCount(userId);
  res.json({ count });
});

// GET /follows/:id/following
followsRouter.get('/:id/following', async (req, res) => {
  const userId = +req.params.id;
  if (!userId) {
    res.status(400).send('Invalid user ID');
    return;
  }

  const count = await followModel.getFollowingCount(userId);
  res.json({ count });
});

export default followsRouter;
