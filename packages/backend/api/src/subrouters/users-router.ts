import express from 'express';
import fs from 'fs';
import fsPromises from 'fs/promises';
import multer from 'multer';
import path from 'path';

import userModel from '@/models/user-model';
import fileUploadManager from '@/utils/file-upload-manager';

const upload = multer({ dest: 'uploads/' });

const usersRouter = express.Router();

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
  }
});

usersRouter.post(
  '/profile-picture',
  upload.single('picture'),
  async (req, res) => {
    try {
      const userId = 1;
      const file = req.file;

      if (!file) {
        res.status(400).json({ error: 'Aucun fichier envoyé' });
        return;
      }

      const formatOk = fileUploadManager.checkFormat(file.mimetype);
      if (!formatOk) {
        res.status(400).json({ error: 'Format de fichier non supporté' });
        return;
      }

      const temporaryPath = path.join('public', 'pictures', 'temp');
      const finalPath = path.join('public', 'pictures', 'users');

      const fileName = fileUploadManager.renameFile(file.mimetype);

      // ✅ fs.promises.rename pour respecter le type Promise attendu
      await fsPromises.rename(
        file.path,
        path.join(temporaryPath, file.filename),
      );
      await fsPromises.rename(
        path.join(temporaryPath, file.filename),
        path.join(temporaryPath, fileName),
      );

      const finalFileName = await fileUploadManager.convertPicture(
        fileName,
        'webp',
      );

      await fsPromises.rename(
        path.join(temporaryPath, finalFileName),
        path.join(finalPath, finalFileName),
      );

      await userModel.updateUserProfile(userId, {
        profile_picture: finalFileName,
      });

      res.status(200).json({
        message: 'Image mise à jour',
        filename: finalFileName,
      });
    } catch (err) {
      console.error('Erreur /profile-picture :', err);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  },
);

usersRouter.get('/pictures/:filename', (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(
    process.cwd(),
    'public',
    'pictures',
    'users',
    filename,
  );

  if (!fs.existsSync(imagePath)) {
    res.status(404).json({ error: 'Image non trouvée' });
    return;
  }

  res.sendFile(imagePath);
});

export default usersRouter;
