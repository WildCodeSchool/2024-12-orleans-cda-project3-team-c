import express from 'express';
import fs from 'fs';
import multer from 'multer';
import path from 'path';

import userModel from '@/models/user-model';

const upload = multer({ dest: 'uploads/' });
const usersRouter = express.Router();

usersRouter.get('/profile', async (req, res) => {
  try {
    const userId = 1;
    console.log('[users-router] GET /profile → userId:', userId);

    const profile = await userModel.getUserProfileById(userId);
    if (!profile) {
      console.warn('[users-router] Profil non trouvé pour userId:', userId);
      res.status(404).json({ error: 'Utilisateur non trouvé' });
      return;
    }

    console.log('[users-router] Profil trouvé →', profile);
    res.json(profile);
  } catch (err) {
    console.error('[users-router] Erreur dans GET /profile:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

usersRouter.patch('/profile', upload.single('picture'), async (req, res) => {
  try {
    const userId = 1;
    const { username, biography } = req.body;
    console.log('[users-router] Fichier reçu :', req.file);

    const file = req.file;

    console.log('[users-router] PATCH /profile → body:', req.body);
    console.log('[users-router] PATCH /profile → file:', file);

    const updates: {
      username?: string;
      biography?: string;
      profile_picture?: string;
    } = {};

    if (file) {
      try {
        const fileName = `${userId}_${Date.now()}${path.extname(file.originalname)}`;
        const targetPath = path.join('uploads', fileName);

        console.log(
          '[users-router] Tentative de déplacement du fichier:',
          file.path,
          '→',
          targetPath,
        );
        fs.renameSync(file.path, targetPath);
        updates.profile_picture = fileName;
        console.log(
          '[users-router] Nouvelle image de profil enregistrée →',
          fileName,
        );
      } catch (fileError) {
        console.error(
          '[users-router] Erreur lors du déplacement du fichier:',
          fileError,
        );
        res
          .status(500)
          .json({
            error: "Erreur lors de l'enregistrement de la photo de profil",
          });
        return;
      }
    }

    if (username) updates.username = username;
    if (biography) updates.biography = biography;

    if (Object.keys(updates).length === 0) {
      console.warn('[users-router] Aucun champ à mettre à jour');
      res.status(400).json({ error: 'Aucune donnée à mettre à jour' });
      return;
    }

    console.log('[users-router] Mise à jour avec:', updates);
    await userModel.updateUserProfile(userId, updates);

    const updatedProfile = await userModel.getUserProfileById(userId);
    console.log('[users-router] Profil après mise à jour →', updatedProfile);
    res.json(updatedProfile);
  } catch (err) {
    console.error('[users-router] Erreur dans PATCH /profile:', err);
    res.status(500).json({ error: 'Erreur serveur lors de la mise à jour' });
  }
});

export default usersRouter;
