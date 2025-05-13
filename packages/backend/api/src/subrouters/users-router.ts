import express from 'express';
import type { Request } from 'express';
import type { UploadedFile } from 'express-fileupload';

import authMiddleware from '@/middlewares/auth.middleware';
import userModel from '@/models/user-model';
import fileUploadManager from '@/utils/file-upload-manager';

const usersRouter = express.Router();

type PictureUploadedFile = {
  mimetype: string;
} & UploadedFile;

usersRouter.use(authMiddleware);

usersRouter.get('/profile', async (req: Request, res) => {
  try {
    const userId = req.userId;
    if (userId === undefined) {
      res.status(401).send('Unauthorized: user not authenticated');
      return;
    }

    const profile = await userModel.getUserProfileById(userId);

    if (!profile) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json(profile);
  } catch (err) {
    console.error('Error /profile:', err);
    res.status(500).json({ error: 'Server error' });
    return;
  }
});

usersRouter.put('/username', async (req: Request, res) => {
  try {
    const userId = req.userId;
    const { username } = req.body;
    if (userId === undefined) {
      res.status(401).send('Unauthorized: user not authenticated');
      return;
    }

    if (!username || typeof username !== 'string' || username.length > 30) {
      res.status(400).json({ error: 'Invalid username' });
      return;
    }

    await userModel.updateUserProfile(userId, { username });

    res.status(200).json({ message: 'Username updated' });
    return;
  } catch (err) {
    console.error('Error /username:', err);
    res.status(500).json({ error: 'Server error' });
    return;
  }
});

usersRouter.put('/biography', async (req: Request, res) => {
  try {
    const userId = req.userId;
    if (userId === undefined) {
      res.status(401).send('Unauthorized: user not authenticated');
      return;
    }
    const { biography } = req.body;

    if (!biography || typeof biography !== 'string' || biography.length > 350) {
      res.status(400).json({ error: 'Invalid biography' });
      return;
    }

    await userModel.updateUserProfile(userId, { biography });

    res.status(200).json({ message: 'Biography updated' });
    return;
  } catch (err) {
    console.error('Error /biography:', err);
    res.status(500).json({ error: 'Server error' });
    return;
  }
});

usersRouter.put('/profile-picture', async (req: Request, res) => {
  try {
    const userId = req.userId;
    if (userId === undefined) {
      res.status(401).send('Unauthorized: user not authenticated');
      return;
    }

    const picture = req.files?.picture as PictureUploadedFile | undefined;

    if (!picture) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    const pictureFile = Array.isArray(picture) ? picture[0] : picture;

    if (!fileUploadManager.checkFormat(pictureFile.mimetype)) {
      res.status(400).json({ error: 'Unsupported file format' });
      return;
    }

    pictureFile.name = fileUploadManager.renameFile(pictureFile.mimetype);
    await fileUploadManager.saveTemporary(pictureFile);
    const pictureName = await fileUploadManager.saveUserPicture(
      pictureFile.name,
    );

    const existingProfile = await userModel.getUserProfileById(userId);
    const previousPicture = existingProfile?.profile_picture;

    await userModel.updateUserProfile(userId, {
      profile_picture: pictureName,
    });

    if (previousPicture && previousPicture !== 'user.png') {
      await fileUploadManager.deleteUserPicture(previousPicture);
    }

    res.status(200).json({
      message: 'Image updated',
      filename: pictureName,
    });
    return;
  } catch (err) {
    console.error('Error /profile-picture:', err);
    res.status(500).json({ error: 'Server error' });
    return;
  }
});

export default usersRouter;
