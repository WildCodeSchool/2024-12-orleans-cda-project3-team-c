import express from 'express';
import type { UploadedFile } from 'express-fileupload';
import fs from 'fs';
import path from 'path';

import userModel from '@/models/user-model';
import fileUploadManager from '@/utils/file-upload-manager';

const usersRouter = express.Router();

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface PictureUploadedFile extends UploadedFile {
  mimetype: string;
}

// GET **************************************************
usersRouter.get('/profile', async (req, res) => {
  try {
    const userId = 1;

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

// PUT **************************************************
usersRouter.put('/username', async (req, res) => {
  try {
    const userId = 1;
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
    return;
  }
});

usersRouter.put('/biography', async (req, res) => {
  try {
    const userId = 1;
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
    return;
  }
});

// PUT **************************************************
usersRouter.put('/profile-picture', async (req, res) => {
  try {
    const userId = 1;

    const picture = req.files?.picture as PictureUploadedFile | undefined;

    if (!picture) {
      res.status(400).json({ error: 'Aucun fichier envoyé' });
      return;
    }

    const pictureFile = Array.isArray(picture) ? picture[0] : picture;

    if (!fileUploadManager.checkFormat(pictureFile.mimetype)) {
      res.status(400).json({ error: 'Format de fichier non supporté' });
      return;
    }

    pictureFile.name = fileUploadManager.renameFile(pictureFile.mimetype);
    await fileUploadManager.saveTemporary(pictureFile);
    const pictureName = await fileUploadManager.saveUserPicture(
      pictureFile.name,
    );

    await userModel.updateUserProfile(userId, {
      profile_picture: pictureName,
    });

    res.status(200).json({
      message: 'Image mise à jour',
      filename: pictureName,
    });
  } catch (err) {
    console.error('Erreur /profile-picture :', err);
    res.status(500).json({ error: 'Erreur serveur' });
    return;
  }
});

// GET **************************************************

export default usersRouter;
