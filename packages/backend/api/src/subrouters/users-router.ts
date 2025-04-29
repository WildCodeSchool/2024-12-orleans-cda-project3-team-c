import express from 'express';

import userModel from '@/models/user-model';

const usersRouter = express.Router();

usersRouter.get('/profile', async (req, res) => {
  try {
    const userId = 1; // temporaire
    const profile = await userModel.getUserProfileById(userId);

    if (!profile) {
      res.status(404).json({ error: 'Utilisateur non trouvé' });
      return;
    }

    res.json(profile);
  } catch (err) {
    console.error('Erreur dans GET /profile :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// UPDATE **************************************************

// DELETE **************************************************

export default usersRouter;
