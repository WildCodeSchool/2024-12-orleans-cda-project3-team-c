import type { Request } from 'express';
import express from 'express';
import type { UploadedFile } from 'express-fileupload';

import postModel from '@/models/post-model';
import userModel from '@/models/user-model';
import fileUploadManager from '@/utils/file-upload-manager';

const usersRouter = express.Router();

type PictureUploadedFile = {
  mimetype: string;
} & UploadedFile;

// GET **************************************************
usersRouter.get('/profile', async (req: Request, res) => {
  const userId = req.userId;
  if (userId === undefined) {
    res.status(401).json('Unauthorized: user not authenticated');
    return;
  }
  try {
    const profile = await userModel.getUserProfileById(userId, userId);

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

usersRouter.get('/profile/:parameter', async (req: Request, res) => {
  const userId = req.userId;
  if (userId === undefined) {
    res.status(401).json('Unauthorized: user not authenticated');
    return;
  }

  const parameter = req.params.parameter;

  let profile;

  try {
    if (+parameter) {
      profile = await userModel.getUserProfileById(+parameter, userId);
    } else {
      profile = await userModel.getUserProfileByUsername(parameter, userId);
    }

    if (!profile) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json(profile);
  } catch (err) {
    console.error('Error /profile:', err);
    res.status(500).json({ error: 'Server error' });
  }
});
usersRouter.get('/:username/posts', async (req: Request, res) => {
  let page = 1;
  if (req.query.page !== '' && req.query.page !== undefined) {
    page = +req.query.page;

    if (!page) {
      res
        .status(400)
        .json({ error: 'Bad request, you should provid a valid page number' });
      return;
    }
  }
  const username = req.params.username;

  if (!username) {
    res
      .status(400)
      .json({ error: 'Bad request, uou should provide a valid username' });
    return;
  }

  const userId = req.userId;

  if (userId === undefined) {
    res.status(401).json({ error: 'Unauthorized: user not authenticated' });
    return;
  }

  const data = await postModel.getFeedPageByUser(username, page, userId);
  res.json(data);
  return;
});

// PUT **************************************************
usersRouter.put('/username', async (req: Request, res) => {
  const userId = req.userId;
  const { username } = req.body;
  if (userId === undefined) {
    res.status(401).json('Unauthorized: user not authenticated');
    return;
  }
  if (!username || typeof username !== 'string' || username.length > 30) {
    res.status(400).json({ error: 'Invalid username' });
    return;
  }
  try {
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
  const userId = req.userId;
  if (userId === undefined) {
    res.status(401).json('Unauthorized: user not authenticated');
    return;
  }
  try {
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
  const userId = req.userId;
  if (userId === undefined) {
    res.status(401).json('Unauthorized: user not authenticated');
    return;
  }
  try {
    const picture = req.files?.picture as PictureUploadedFile | undefined;

    if (!picture) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    if (!fileUploadManager.checkFormat(picture.mimetype)) {
      res.status(400).json({ error: 'Unsupported file format' });
      return;
    }

    picture.name = fileUploadManager.renameFile(picture.mimetype);
    await fileUploadManager.saveTemporary(picture);
    const pictureName = await fileUploadManager.saveUserPicture(picture.name);

    const currentPicture = await userModel.getUserProfilePicture(userId);
    const previousPicture = currentPicture?.profile_picture;

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
