import express from 'express';

import userModel from '@/models/user-model';

const suggestionsRouter = express.Router();

suggestionsRouter.get('/users', async (req, res) => {
  const testUser = 1;
  try {
    const usersWithFollowers =
      await userModel.getUserSuggestionsForUser(testUser);
    res.json(usersWithFollowers);
    return;
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
    return;
  }
});

export default suggestionsRouter;
