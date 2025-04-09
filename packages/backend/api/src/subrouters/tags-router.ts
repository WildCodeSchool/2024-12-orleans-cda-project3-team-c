import express from 'express';

import postModel from '@/models/post-model';
import tagModel from '@/models/tag-model';

const tagsRouter = express.Router();

// GET **************************************************
tagsRouter.get('/:param', async function (req, res) {
  const parameter = req.params.param;
  let data;

  if (+parameter) {
    data = await tagModel.getById(+parameter);
  } else {
    data = await tagModel.getByName(parameter);
  }
  res.json(data);
});

tagsRouter.get('/tag/:tag/posts', function () {
  // Getting posts from a specified tag
});

// POST **************************************************

// UPDATE **************************************************

// DELETE **************************************************
export default tagsRouter;
