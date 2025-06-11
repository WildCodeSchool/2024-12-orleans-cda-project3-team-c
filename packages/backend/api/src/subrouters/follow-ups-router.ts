import type { Request } from 'express';
import express from 'express';

import followUpModel from '@/models/follow-up-model';

const followUpsRouter = express.Router();

// GET **************************************************
followUpsRouter.get('/:id', async (req: Request, res) => {
  const userId = Number(req.params.id);
  if (isNaN(userId)) {
    res.status(400).json({ error: 'Invalid user id' });
    return;
  }
  try {
    const followees = await followUpModel.getFollowees(userId);
    const followers = await followUpModel.getFollowers(userId);
    res.json({ followees, followers });
  } catch (error) {
    console.error('Error fetching followers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
    return;
  }
});

followUpsRouter.post('/', async (req: Request, res) => {
  const userId = req.userId;

  if (userId === undefined) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const { followeeId } = req.body;

  if (typeof followeeId !== 'number') {
    res.status(400).json({ error: 'Invalid parameters' });
    return;
  }

  try {
    const result = await followUpModel.addFollow(userId, followeeId);
    res.status(201).json(result);
    return;
  } catch (error) {
    console.error('Error adding follow:', error);
    res.status(500).json({ error: 'Internal Server Error' });
    return;
  }
});

followUpsRouter.delete('/', async (req: Request, res) => {
  const userId = req.userId;

  if (userId === undefined) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const { followeeId } = req.body;

  if (typeof followeeId !== 'number') {
    res.status(400).json({ error: 'Invalid parameters' });
    return;
  }

  try {
    const result = await followUpModel.deleteFollow(userId, followeeId);
    res.json(result);
    return;
  } catch (error) {
    console.error('Error deleting follow:', error);
    res.status(500).json({ error: 'Internal Server Error' });
    return;
  }
});

export default followUpsRouter;
