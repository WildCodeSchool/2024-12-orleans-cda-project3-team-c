import express from 'express';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import followsRouter from './subrouters/follows-router';
import postsRouter from './subrouters/posts-router';
import suggestionRouter from './subrouters/suggestion-router';
import tagsRouter from './subrouters/tags-router';

// const filename = fileURLToPath(import.meta.url);

// const directory = dirname(filename);

const router = express.Router();

router.use('/follow', followsRouter);
router.use('/posts', postsRouter);
router.use('/tags', tagsRouter);
router.use('/suggestion', suggestionRouter);

// router.use(
//   '/api/public/pictures/users',
//   express.static(path.join(directory, '..', 'public', 'pictures', 'users')),
// );

router.get('*', function (req, res) {
  res.status(404).send(`ressource ${req.path} not found`);
});

export default router;
