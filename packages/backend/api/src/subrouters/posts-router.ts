import express from 'express';

import postModel from '@/models/post-model';

const postsRouter = express.Router();

// GET **************************************************
postsRouter.get('/:id', function () {
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

// UPDATE **************************************************

// DELETE **************************************************
export default postsRouter;
