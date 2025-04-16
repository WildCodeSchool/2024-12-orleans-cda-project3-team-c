import express from 'express';
import fs from 'fs';
import multer from 'multer';
import path from 'path';

import postModel from '@/models/post-model';
import userModel from '@/models/user-model';

const upload = multer({ dest: 'uploads/' });

const usersRouter = express.Router();

// ✅ GET profil utilisateur
usersRouter.get('/profile', async (req, res) => {
  try {
    const userId = 1; // temporaire
    const user = await userModel.getUserById(userId);

    if (!user) {
      res.status(404).json({ error: 'Utilisateur non trouvé' });
      return;
    }

    const posts = await postModel.getFeedPage(1, userId);

    const profile = {
      id: user.id,
      username: user.username,
      profile_picture: user.profile_picture
        ? `${req.protocol}://${req.get('host')}/api/users/pictures/${user.profile_picture}`
        : null,
      biography: user.biography,
      notoriety: user.notoriety,
      posts: posts.map((post) => ({
        id: post.id,
        picture: post.picture,
        description: post.description,
        created_at: post.created_at,
        likeCount: post.likeCount,
        commentCount: post.commentCount,
      })),
    };

    res.json(profile);
  } catch (err) {
    console.error('Erreur /profile :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

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

      await userModel.updateProfilePicture(userId, file.filename);

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

// ✅ PUT pour mettre à jour le username
usersRouter.put('/username', async (req, res) => {
  try {
    const userId = 1; // temporaire
    const { username } = req.body;

    if (!username || typeof username !== 'string' || username.length > 30) {
      res.status(400).json({ error: 'Nom d’utilisateur invalide' });
      return;
    }

    await userModel.updateUsername(userId, username);

    res.status(200).json({ message: 'Nom d’utilisateur mis à jour' });
  } catch (err) {
    console.error('Erreur /username :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// ✅ PUT pour mettre à jour la biographie
usersRouter.put('/biography', async (req, res) => {
  try {
    const userId = 1; // temporaire
    const { biography } = req.body;

    if (!biography || typeof biography !== 'string' || biography.length > 350) {
      res.status(400).json({ error: 'Biographie invalide' });
      return;
    }

    await userModel.updateBiography(userId, biography);

    res.status(200).json({ message: 'Biographie mise à jour' });
  } catch (err) {
    console.error('Erreur /biography :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default usersRouter;
