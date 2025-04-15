import express from 'express';

import userModel from '@/models/user-model';

const userRouter = express.Router();

userRouter.get('/:userId', async (req, res) => {
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
    const user = await userModel.getUserById(userIdNumber);
    if (user) {
      res.json(user); // Cela inclura maintenant profile_picture
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default userRouter;
