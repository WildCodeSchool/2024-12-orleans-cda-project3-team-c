import express from 'express';
import type { Request, Response } from 'express';

import followModel from '@/models/follow-suggestion-model';

const followRouter = express.Router();

followRouter.get(
  '/check',
  async (req: Request, res: Response): Promise<void> => {
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
  },
);

followRouter.get(
  '/followers-count/:userId',
  async (req: Request, res: Response): Promise<void> => {
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
      const result =
        await followModel.getFollowersSuggestionCount(userIdNumber);
      res.json(result);
    } catch (error) {
      console.error('Error getting followers count:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
);

followRouter.get(
  '/following-count/:userId',
  async (req: Request, res: Response): Promise<void> => {
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
      const result =
        await followModel.getFollowingSuggestionCount(userIdNumber);
      res.json(result);
    } catch (error) {
      console.error('Error getting following count:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
);

followRouter.post(
  '/follow',
  async (req: Request, res: Response): Promise<void> => {
    const { followerId, followeeId } = req.body;

    if (typeof followerId !== 'number' || typeof followeeId !== 'number') {
      res.status(400).json({ error: 'Invalid parameters' });
      return;
    }

    try {
      const result = await followModel.addFollowSuggestion(
        followerId,
        followeeId,
      );
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
    const { followerId, followeeId } = req.body;

    if (typeof followerId !== 'number' || typeof followeeId !== 'number') {
      res.status(400).json({ error: 'Invalid parameters' });
      return;
    }

    try {
      const result = await followModel.deleteFollowSuggestion(
        followerId,
        followeeId,
      );
      res.json(result);
    } catch (error) {
      console.error('Error deleting follow:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
);

export default followRouter;
