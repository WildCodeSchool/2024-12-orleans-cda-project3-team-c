import express from 'express';

import { db } from '@app/backend-shared';

const postsRouter = express.Router();

// GET
postsRouter.get('/:id', function (req, res) {
  res.send('Getting a specified post');
});

postsRouter.get('/page/:number', async function (req, res) {
  const page = +req.params.number;

  if (!page) {
    res.status(400).send('Bad request, you should provide a valid page number');
  }

  const data = await db.selectFrom('post').selectAll().execute();
  console.log(data);

  res.send('Getting a post page');
});

postsRouter.get('/user/:id', function (req, res) {
  res.send('Getting posts from a specified user');
});

postsRouter.get('/tag/:tag', function (req, res) {
  res.send('Getting posts from a specified tag');
});

// POST

// UPDATE

// DELETE

export default postsRouter;
