import express from 'express';

import postLikeModel from '@/models/post-like-model';

const postLikesRouter = express.Router();

// POST **************************************************
postLikesRouter.post('/:postId', async function (req, res) {
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

// DELETE **************************************************
postLikesRouter.delete('/:postId', async function (req, res) {
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

export default postLikesRouter;
