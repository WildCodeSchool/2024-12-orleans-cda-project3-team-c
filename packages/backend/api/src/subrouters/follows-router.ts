import express from 'express';

import followModel from '@/models/follow-model';

const followRouter = express.Router();

// GET **************************************************

// Vérifier le statut de suivi
followRouter.get('/check', async function (req, res) {
  const { followerId, followeeId } = req.query;

  if (typeof followerId !== 'string' || typeof followeeId !== 'string') {
    res.status(400).json({ error: 'Invalid parameters' });
    return;
  }

  const followerIdNumber = Number(followerId);
  const followeeIdNumber = Number(followeeId);

  if (isNaN(followerIdNumber) || isNaN(followeeIdNumber)) {
    res.status(400).json({ error: 'Invalid parameters' });
    return;
  }

  try {
    const result = await followModel.checkFollowStatus(
      followerIdNumber,
      followeeIdNumber,
    );
    res.json(result);
  } catch (error) {
    console.error('Error checking follow status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Obtenir le nombre de followers
followRouter.get('/followers-count/:userId', async function (req, res) {
  const { userId } = req.params;

  if (typeof userId !== 'string') {
    res.status(400).json({ error: 'Invalid user ID' });
    return;
  }

  const userIdNumber = Number(userId);

  if (isNaN(userIdNumber)) {
    res.status(400).json({ error: 'Invalid user ID' });
    return;
  }

  try {
    const result = await followModel.getFollowersCount(userIdNumber);
    res.json(result);
  } catch (error) {
    console.error('Error getting followers count:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Obtenir le nombre de suivis
followRouter.get('/following-count/:userId', async function (req, res) {
  const { userId } = req.params;

  if (typeof userId !== 'string') {
    res.status(400).json({ error: 'Invalid user ID' });
    return;
  }

  const userIdNumber = Number(userId);

  if (isNaN(userIdNumber)) {
    res.status(400).json({ error: 'Invalid user ID' });
    return;
  }

  try {
    const result = await followModel.getFollowingCount(userIdNumber);
    res.json(result);
  } catch (error) {
    console.error('Error getting following count:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST **************************************************

// Ajouter un suivi
followRouter.post('/follow', async function (req, res) {
  const { followerId, followeeId } = req.body;

  if (typeof followerId !== 'number' || typeof followeeId !== 'number') {
    res.status(400).json({ error: 'Invalid parameters' });
    return;
  }

  try {
    const result = await followModel.addFollow(followerId, followeeId);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error adding follow:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE **************************************************

// Supprimer un suivi
followRouter.delete('/unfollow', async function (req, res) {
  const { followerId, followeeId } = req.body;

  if (typeof followerId !== 'number' || typeof followeeId !== 'number') {
    res.status(400).json({ error: 'Invalid parameters' });
    return;
  }

  try {
    const result = await followModel.deleteFollow(followerId, followeeId);
    res.json(result);
  } catch (error) {
    console.error('Error deleting follow:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default followRouter;
