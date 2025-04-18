import express from 'express';

import followModel from '@/models/follow-model';

const followsRouter = express.Router();
// temporaire
const userId = 1;

// GET /follows/:id/followers
followsRouter.get('/${userId}/followers', async (req, res) => {
  try {
    const count = await followModel.getFollowersCount(userId);
    res.json({ count });
  } catch (error) {
    console.error('Erreur lors de la récupération des followers :', error);
    res.status(400).send('Erreur serveur');
  }
});

// GET /follows/:id/following
followsRouter.get('/:{userId}/following', async (req, res) => {
  try {
    const count = await followModel.getFollowingCount(userId);
    res.json({ count });
  } catch (error) {
    console.error('Erreur lors de la récupération des followings :', error);
    res.status(400).send('Erreur serveur');
  }
});

postsRouter.get('/`${userId}`/followers', async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  if (isNaN(userId)) {
    res.status(400).send('Invalid user ID');
    return;
  }

  const followersCount = await followModel.getFollowersCount(userId);
  res.json({ count: followersCount });
});

postsRouter.get('/`${userId}`/following', async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  if (isNaN(userId)) {
    res.status(400).send('Invalid user ID');
    return;
  }

  const followingCount = await followModel.getFollowingCount(userId);
  res.json({ count: followingCount });
});

export default followsRouter;
