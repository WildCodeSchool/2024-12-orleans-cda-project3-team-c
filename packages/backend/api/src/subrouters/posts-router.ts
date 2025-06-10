import type { Request } from 'express';
import express from 'express';
import type { UploadedFile } from 'express-fileupload';

import commentModel from '@/models/comment-model';
import type { PostTagInsertionList } from '@/models/model-types';
import postLikeModel from '@/models/post-like-model';
import postModel from '@/models/post-model';
import postTagModel from '@/models/post-tag-model';
import tagModel from '@/models/tag-model';
import fileUploadManager from '@/utils/file-upload-manager';
import textParsers from '@/utils/text-parsers';

const postsRouter = express.Router();

type PictureUploadedFile = {
  mimetype: string;
} & UploadedFile;

// GET **************************************************
postsRouter.get('', async function (req: Request, res) {
  let page = 1;
  if (req.query.page !== '' && req.query.page !== undefined) {
    page = +req.query.page;
    if (!page) {
      res
        .status(400)
        .json({ error: 'Bad request, you should provide a valid page number' });
      return;
    }
  }

  const userId = req.userId;

  if (userId === undefined) {
    res.status(401).json({ error: 'Unauthorized: user not authenticated' });
    return;
  }

  const data = await postModel.getFeedPage(page, userId);
  res.json(data);
});

postsRouter.get('/:postId', async function (req: Request, res) {
  const userId = req.userId;

  if (userId === undefined) {
    res.status(401).json({ error: 'Unauthorized: user not authenticated' });
    return;
  }

  let postId: number;
  if (req.params.postId !== '' && req.params.postId !== undefined) {
    postId = +req.params.postId;
    if (!postId) {
      res
        .status(400)
        .json({ error: 'Bad request, you should provide a valid post id' });
      return;
    } else {
      const data = await postModel.getPost(postId, userId);
      res.json(data);
    }
  }
});

postsRouter.get('/:postId/likes', async (req: Request, res) => {
  const userId = req.userId;

  if (userId === undefined) {
    res.status(401).json({ error: 'Unauthorized: user not authenticated' });
    return;
  }

  let page = 1;
  if (req.query.page !== '' && req.query.page !== undefined) {
    page = +req.query.page;
    if (!page) {
      res
        .status(400)
        .json({ error: 'Bad request, you should provide a valid page number' });
      return;
    }
  }

  let postId: number;
  if (req.params.postId !== '' && req.params.postId !== undefined) {
    postId = +req.params.postId;
    if (!postId) {
      res
        .status(400)
        .json({ error: 'Bad request, you should provide a valid post id' });
      return;
    } else {
      const data = await postLikeModel.getLikesByPost(postId, userId, page);
      res.json(data);
    }
  }

  return;
});

// POST **************************************************
postsRouter.post('', async function (req: Request, res) {
  const picture = req.files?.picture as PictureUploadedFile;
  const description = req.body.description;

  const userId = req.userId;

  if (userId === undefined) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  if (picture === undefined) {
    res.sendStatus(400);
    return;
  } else if (!fileUploadManager.checkFormat(picture.mimetype)) {
    res.status(400).json({
      error: 'Wrong picture format. Should be jpg, png, webp or avif',
    });
    return;
  }

  picture.name = fileUploadManager.renameFile(picture.mimetype);
  await fileUploadManager.saveTemporary(picture);
  const pictureName = await fileUploadManager.savePostPicture(picture.name);

  if (pictureName !== undefined) {
    const userId = req.userId;
    if (userId === undefined) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const data = await postModel.create(pictureName, description, userId);
    const postId = Number(data.insertId);

    if (description !== '') {
      const tags = textParsers.getTags(description);
      if (tags.length) {
        const postTagInsertionList: PostTagInsertionList[] = [];

        for (const tag of tags) {
          const tagData = await tagModel.create(tag.substring(1));
          if (tagData) {
            postTagInsertionList.push({
              tag_id: Number(tagData.id),
              post_id: postId,
            });
          }
        }

        if (postTagInsertionList.length > 0) {
          await postTagModel.createMany(postTagInsertionList);
        }
      }
    }

    res.sendStatus(200);
  }
});

postsRouter.post('/:postId/like', async function (req: Request, res) {
  const userId = req.userId;

  if (userId === undefined) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const postId = +req.params.postId;

  if (!postId) {
    res
      .status(400)
      .json({ error: 'Bad request, you should provide a valid post id' });
    return;
  }

  const data = await postLikeModel.addPostLike(postId, userId);
  if (data) {
    res.json(data);
  } else {
    res.status(500).json({ error: 'Something went wrong while liking post' });
    return;
  }
});

postsRouter.post('/:postId/comment', async function (req: Request, res) {
  const userId = req.userId;
  if (userId === undefined) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const postId = +req.params.postId;

  if (!postId) {
    res
      .status(400)
      .json({ error: 'Bad request, you should provide a valid post id' });
    return;
  }

  const { text, respondsTo } = req.body;

  if (text === '') {
    res.status(400).json({ message: 'Your comment cannot be empty' });
    return;
  }

  const data = await commentModel.postComment(postId, userId, text, respondsTo);
  res.json({ ok: true, comment: data });
  return;
});

// DELETE **************************************************
postsRouter.delete('/:postId', async function (req: Request, res) {
  const userId = req.userId;

  if (userId === undefined) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const postId = +req.params.postId;

  if (!postId) {
    res
      .status(400)
      .json({ error: 'Bad request, you should provide a valid post id' });
    return;
  }

  const authorId = await postModel.getPostAuthorId(postId);

  if (authorId?.user_id === userId) {
    const response = await postModel.delete(postId);
    res.json(response);
  } else {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
});

postsRouter.delete('/:postId/like', async function (req: Request, res) {
  const userId = req.userId;

  if (userId === undefined) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const postId = +req.params.postId;

  if (!postId) {
    res
      .status(400)
      .json({ error: 'Bad request, you should provide a valid post id' });
    return;
  }

  const data = await postLikeModel.deletePostLike(postId, userId);

  if (data) {
    res.json(data);
  } else {
    res.status(500).json({ error: 'Something went wrong while unliking post' });
    return;
  }
});

export default postsRouter;
