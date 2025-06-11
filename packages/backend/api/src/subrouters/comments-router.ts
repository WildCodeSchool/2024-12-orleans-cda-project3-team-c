import type { Request } from 'express';
import express from 'express';

import commentLikeModel from '@/models/comment-like-model';
import commentModel from '@/models/comment-model';

const commentsRouteur = express.Router();

// GET **************************************************
commentsRouteur.get('', async function (req: Request, res) {
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
  if (req.query.postId !== '' && req.query.postId !== undefined) {
    postId = +req.query.postId;
    if (!postId) {
      res
        .status(400)
        .json({ error: 'Bad request, you should provide a valid post id' });
      return;
    } else {
      const data = await commentModel.getCommentsByPostId(postId, userId, page);
      res.json(data);
    }
  }

  return;
});

// POST **************************************************
commentsRouteur.post('/:commentId/like', async function (req: Request, res) {
  const userId = req.userId;

  if (userId === undefined) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const commentId = +req.params.commentId;

  if (!commentId) {
    res
      .status(400)
      .json({ error: 'Bad request, you should provide a valid comment id' });
    return;
  }

  const data = await commentLikeModel.addCommentLike(commentId, userId);
  res.json(data);
  return;
});

// DELETE **************************************************
commentsRouteur.delete('/:commentId/like', async function (req: Request, res) {
  const userId = req.userId;

  if (userId === undefined) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const commentId = +req.params.commentId;

  if (!commentId) {
    res
      .status(400)
      .json({ error: 'Bad request, you should provide a valid comment id' });
    return;
  }

  const data = await commentLikeModel.deleteCommentLike(commentId, userId);

  res.json(data);
  return;
});

export default commentsRouteur;
