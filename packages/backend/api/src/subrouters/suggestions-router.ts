import express from 'express';
import type { Request } from 'express';

import userModel from '@/models/user-model';

const suggestionsRouter = express.Router();

suggestionsRouter.get('/users', async (req: Request, res) => {
  const userId = req.userId;

  if (userId === undefined) {
    res.status(401).json('Unauthorized: user not authenticated');
    return;
  }

  try {
    const usersWithFollowers =
      await userModel.getUserSuggestionsForUser(userId);
    res.json(usersWithFollowers);
    return;
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
    return;
  }
});

export default suggestionsRouter;
