import express from 'express';

import postModel from '@/models/post-model';

const postsRouter = express.Router();

// GET **************************************************
postsRouter.get('/:id', function () {
  // Getting a specified post
});

postsRouter.get('/page/:number', async function (req, res) {
  const page = +req.params.number;

  if (!page) {
    res.status(400).send('Bad request, you should provide a valid page number');
  }

  const testConnectedUser = 1;
  const data = await postModel.getFeedPage(page, testConnectedUser);
  res.json(data);
});

postsRouter.get('/user/:id', function () {
  // Getting posts from a specified user
});

postsRouter.get('/tag/:tag', function () {
  // Getting posts from a specified tag
});

// POST **************************************************

// UPDATE **************************************************

// DELETE **************************************************
export default postsRouter;
