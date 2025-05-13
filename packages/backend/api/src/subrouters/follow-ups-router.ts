import express from 'express';

import followUpModel from '@/models/follow-up-model';

const followUpsRouter = express.Router();
const testUser = 1;

followUpsRouter.post('/', async (req, res) => {
  const { followeeId } = req.body;

  if (typeof followeeId !== 'number') {
    res.status(400).json({ error: 'Invalid parameters' });
    return;
  }

  try {
    const result = await followUpModel.addFollow(testUser, followeeId);
    res.status(201).json(result);
    return;
  } catch (error) {
    console.error('Error adding follow:', error);
    res.status(500).json({ error: 'Internal Server Error' });
    return;
  }
});

followUpsRouter.delete('/', async (req, res) => {
  const { followeeId } = req.body;

  if (typeof followeeId !== 'number') {
    res.status(400).json({ error: 'Invalid parameters' });
    return;
  }

  try {
    const result = await followUpModel.deleteFollow(testUser, followeeId);
    res.json(result);
    return;
  } catch (error) {
    console.error('Error deleting follow:', error);
    res.status(500).json({ error: 'Internal Server Error' });
    return;
  }
});

export default followUpsRouter;
