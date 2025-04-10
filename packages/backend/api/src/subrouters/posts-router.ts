import express from 'express';
import type { UploadedFile } from 'express-fileupload';

import postLikeModel from '@/models/post-like-model';
import postModel from '@/models/post-model';
import postTagModel from '@/models/post-tag-model';
import tagModel from '@/models/tag-model';
import fileUploadManager from '@/utils/file-upload-manager';
import textParsers from '@/utils/text-parsers';

const postsRouter = express.Router();

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface PictureUploadedFile extends UploadedFile {
  mimetype: string;
}

// GET **************************************************
postsRouter.get('/:id', function () {
  // Getting a specified post
});

postsRouter.get('', async function (req, res) {
  let page = 1;
  if (req.query.page !== '' && req.query.page !== undefined) {
    page = +req.query.page;
    if (!page) {
      res
        .status(400)
        .send('Bad request, you should provide a valid page number');
    }
  }

  const testConnectedUser = 1;
  const data = await postModel.getFeedPage(page, testConnectedUser);
  res.json(data);
});

// POST **************************************************
postsRouter.post('', async function (req, res) {
  const picture = req.files?.picture as PictureUploadedFile;
  const description = req.body.description;

  if (picture === undefined) {
    res.sendStatus(400);
  } else if (!fileUploadManager.checkFormat(picture.mimetype)) {
    res
      .status(400)
      .send('Wrong picture format. Should be jpg, png, webp or avif');
  }

  // Picture upload
  picture.name = fileUploadManager.renameFile(picture.mimetype);
  await fileUploadManager.saveTemporary(picture);
  const pictureName = await fileUploadManager.savePostPicture(picture.name);
  if (pictureName !== undefined) {
    const testConnectedUser = 1;
    const data = await postModel.create(
      pictureName,
      description,
      testConnectedUser,
    );
    const postId = Number(data.insertId);

    if (description !== '') {
      const tags = textParsers.getTags(description);
      if (tags.length) {
        for (const tag of tags) {
          const tagData = await tagModel.create(tag.substring(1));
          if (tagData) {
            const tagId = Number(tagData.id);
            await postTagModel.create(tagId, postId);
          }
        }
      }
    }
    res.sendStatus(200);
  }
});

postsRouter.post('/:postId/like', async function (req, res) {
  const testConnectedUser = 1;

  const postId = +req.params.postId;

  if (!postId) {
    res.status(400).send('Bad request, you should provide a valid post id');
  }

  const data = await postLikeModel.addPostLike(postId, testConnectedUser);
  if (data) {
    res.json(data);
  } else {
    res.status(500).send('Something went wrong while liking post');
  }
});

// UPDATE **************************************************

// DELETE **************************************************
postsRouter.delete('/:postId/like', async function (req, res) {
  const testConnectedUser = 1;

  const postId = +req.params.postId;

  if (!postId) {
    res.status(400).send('Bad request, you should provide a valid post id');
  }

  const data = await postLikeModel.deletePostLike(postId, testConnectedUser);
  if (data) {
    res.json(data);
  } else {
    res.status(500).send('Something went wrong while unliking post');
  }
});

export default postsRouter;
