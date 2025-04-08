import express from 'express';

import postModel from '@/models/post-model';

const tagsRouter = express.Router();

// GET **************************************************

tagsRouter.get('/tag/:tag/posts', function () {
  // Getting posts from a specified tag
});

// POST **************************************************

// UPDATE **************************************************

// DELETE **************************************************
export default tagsRouter;
