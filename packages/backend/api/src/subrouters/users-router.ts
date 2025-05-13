import type { Request } from 'express';
import express from 'express';

import userModel from '@/models/user-model';

const usersRouter = express.Router();

usersRouter.get('/profile', async (req: Request, res) => {
  const userId = req.userId;
  if (userId === undefined) {
    res.status(401).json({ error: 'Unauthorized: user not authenticated' });
    return;
  }
  try {
    const profile = await userModel.getUserProfileById(userId);

    if (!profile) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json(profile);
  } catch (err) {
    console.error('Erreur dans GET /profile :', err);
    console.error('Error /profile:', err);
    res.status(500).json({ error: 'Server error' });
    return;
  }
});

export default usersRouter;
