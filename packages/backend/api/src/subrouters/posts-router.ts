import express from 'express';

import postLikeModel from '@/models/post-like-model';
import postModel from '@/models/post-model';

const postsRouter = express.Router();

// GET **************************************************
postsRouter.get('/:id', function (req, res) {
  // Getting a specified post
});

postsRouter.get('', async function (req, res) {
  let page = 1;
  if (req.query.page) {
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
