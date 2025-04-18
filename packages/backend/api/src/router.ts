import express from 'express';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import followRouter from './subrouters/follow-router';
import postsRouter from './subrouters/posts-router';
import tagsRouter from './subrouters/tags-router';
import usersRouter from './subrouters/user-router';

const filename = fileURLToPath(import.meta.url);

const directory = dirname(filename);

const router = express.Router();

router.use('/follow', followRouter);
router.use('/posts', postsRouter);
router.use('/tags', tagsRouter);
router.use('/users', usersRouter);

router.use(
  '/api/public/pictures/users',
  express.static(path.join(directory, '..', 'public', 'pictures', 'users')),
);

router.get('*', function (req, res) {
  res.status(404).send(`ressource ${req.path} not found`);
});

export default router;
