import express from 'express';
import fs from 'fs';
import multer from 'multer';
import path from 'path';

import userModel from '@/models/user-model';

const upload = multer({ dest: 'uploads/' });

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
    console.error('Erreur /profile :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// //////////////////////////////////////////////

usersRouter.put('/username', async (req, res) => {
  try {
    const userId = 1; // temporaire
    const { username } = req.body;

    if (!username || typeof username !== 'string' || username.length > 30) {
      res.status(400).json({ error: 'Nom d’utilisateur invalide' });
      return;
    }

    await userModel.updateUserProfile(userId, { username });

    res.status(200).json({ message: 'Nom d’utilisateur mis à jour' });
  } catch (err) {
    console.error('Erreur /username :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

usersRouter.put('/biography', async (req, res) => {
  try {
    const userId = 1; // temporaire
    const { biography } = req.body;

    if (!biography || typeof biography !== 'string' || biography.length > 350) {
      res.status(400).json({ error: 'Biographie invalide' });
      return;
    }

    await userModel.updateUserProfile(userId, { biography });

    res.status(200).json({ message: 'Biographie mise à jour' });
  } catch (err) {
    console.error('Erreur /biography :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// //////////////////////////////////////////////

// ✅ POST upload photo de profil
usersRouter.post(
  '/profile-picture',
  upload.single('picture'),
  async (req, res) => {
    try {
      const userId = 1; // temporaire
      const file = req.file;

      if (!file) {
        res.status(400).json({ error: 'Aucun fichier envoyé' });
        return;
      }

      // Mise à jour de l'image de profil dans la base de données
      await userModel.updateUserProfile(userId, {
        profile_picture: file.filename,
      });

      res.status(200).json({
        message: 'Image mise à jour',
        filename: file.filename,
      });
    } catch (err) {
      console.error('Erreur /profile-picture :', err);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  },
);

// ✅ GET récupérer une photo de profil
usersRouter.get('/pictures/:filename', (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(process.cwd(), 'uploads', filename);

  if (!fs.existsSync(imagePath)) {
    res.status(404).json({ error: 'Image non trouvée' });
    return;
  }

  res.sendFile(imagePath);
});

export default usersRouter;
