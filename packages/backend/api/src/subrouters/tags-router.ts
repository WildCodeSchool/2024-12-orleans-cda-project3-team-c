import express from 'express';

import tagModel from '@/models/tag-model';

const tagsRouter = express.Router();

// GET **************************************************
tagsRouter.get('/:tagIdOrTagName', async function (req, res) {
  const parameter = req.params.tagIdOrTagName;
  let data;

  if (+parameter) {
    data = await tagModel.getById(+parameter);
  } else {
    data = await tagModel.getByName(parameter);
  }
  if (data !== undefined) {
    res.json(data);
    return;
  } else {
    res.sendStatus(404);
    return;
  }
});

tagsRouter.get('/tag/:tag/posts', function () {
  // Getting posts from a specified tag
});

// POST **************************************************

// UPDATE **************************************************

// DELETE **************************************************
export default tagsRouter;
