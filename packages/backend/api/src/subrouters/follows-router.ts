import express from 'express';
import type { Request, Response } from 'express';

import followModel from '@/models/follow-model';

const followRouter = express.Router();
const testUser = 1;

followRouter.post(
  '/follow',
  async (req: Request, res: Response): Promise<void> => {
    const { followeeId } = req.body;

    if (typeof followeeId !== 'number') {
      res.status(400).json({ error: 'Invalid parameters' });
      return;
    }

    try {
      const result = await followModel.addFollow(testUser, followeeId);
      res.status(201).json(result);
    } catch (error) {
      console.error('Error adding follow:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
);

followRouter.delete(
  '/unfollow',
  async (req: Request, res: Response): Promise<void> => {
    const { followeeId } = req.body;

    if (typeof followeeId !== 'number') {
      res.status(400).json({ error: 'Invalid parameters' });
      return;
    }

    try {
      const result = await followModel.deleteFollow(testUser, followeeId);
      res.json(result);
    } catch (error) {
      console.error('Error deleting follow:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
);

export default followRouter;
