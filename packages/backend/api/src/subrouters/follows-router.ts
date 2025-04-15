import express from 'express';

import followModel from '@/models/follow-model';

const followsRouter = express.Router();
// temporaire
const userId = 1;

// GET /follows/:id/followers
followsRouter.get('/:id/followers', async (req, res) => {
  try {
    const count = await followModel.getFollowersCount(userId);
    res.json({ count });
  } catch (error) {
    console.error('Erreur lors de la récupération des followers :', error);
    res.status(400).send('Erreur serveur');
  }
});

// GET /follows/:id/following
followsRouter.get('/:id/following', async (req, res) => {
  try {
    const count = await followModel.getFollowingCount(userId);
    res.json({ count });
  } catch (error) {
    console.error('Erreur lors de la récupération des followings :', error);
    res.status(400).send('Erreur serveur');
  }
});

export default followsRouter;
