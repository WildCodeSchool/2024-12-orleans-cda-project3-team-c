import express from 'express';

import { userRegister } from '@/models/user-model';

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


// POST **************************************************

usersRouter.post('/', async function (req, res) {
  try {
    const { email, username, password } = req.body;

    const result = await userRegister(email, username, password);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal register server error' });
  }
});

// UPDATE **************************************************

// DELETE **************************************************

export default usersRouter;
