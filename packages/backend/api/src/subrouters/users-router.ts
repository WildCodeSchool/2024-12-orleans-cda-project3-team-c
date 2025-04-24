import express from 'express';
import fs from 'fs';
import multer from 'multer';
import path from 'path';

import userModel from '@/models/user-model';

const upload = multer({ dest: 'uploads/' }); // où les fichiers seront temporaires

const usersRouter = express.Router();

// Route GET pour récupérer le profil de l'utilisateur
usersRouter.get('/profile', async (req, res) => {
  try {
    const userId = 1; // temporaire, tu pourras récupérer l'ID de l'utilisateur via auth
    const profile = await userModel.getUserProfileById(userId);

    if (!profile) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    res.json(profile);
  } catch (err) {
    console.error('Erreur /profile :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Route PATCH pour mettre à jour le profil, y compris la photo
usersRouter.patch('/profile', upload.single('picture'), async (req, res) => {
  try {
    const userId = 1; // temporaire, ici tu devras récupérer l'ID utilisateur via un token d'authentification
    const { username, biography } = req.body;
    const file = req.file;

    const updates: {
      username?: string;
      biography?: string;
      profile_picture?: string;
    } = {};

    // Si un fichier est reçu, on le traite
    if (file) {
      const fileName = `${userId}_${Date.now()}${path.extname(file.originalname)}`;
      const targetPath = path.join('uploads', fileName);

      // Déplace le fichier uploadé dans le bon répertoire
      fs.renameSync(file.path, targetPath);

      // On ajoute le nom de fichier à la mise à jour
      updates.profile_picture = fileName;
    }

    // Si des informations ont été fournies pour le username ou la biographie, on les ajoute à la mise à jour
    if (username) updates.username = username;
    if (biography) updates.biography = biography;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: 'Aucune donnée à mettre à jour' });
    }

    // Met à jour l'utilisateur dans la BDD avec les nouvelles informations
    await userModel.updateUserProfile(userId, updates);

    // Récupère et renvoie le profil mis à jour
    const updatedProfile = await userModel.getUserProfileById(userId);
    res.json(updatedProfile);
  } catch (err) {
    console.error('Erreur PATCH /profile :', err);
    res.status(500).json({ error: 'Erreur serveur lors de la mise à jour' });
  }
});

export default usersRouter;
