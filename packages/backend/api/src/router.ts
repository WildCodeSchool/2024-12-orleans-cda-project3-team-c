import express from 'express';
import path, { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import postsRouter from './subrouters/posts-router';
import tagsRouter from './subrouters/tags-router';
import usersRouter from './subrouters/users-router';

const router = express.Router(); // 👈 doit être déclaré AVANT de l’utiliser

// Support __dirname with ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.use(
  '/users/pictures',
  express.static(join(__dirname, '..', 'public', 'pictures', 'users')),
);

router.use('/posts', postsRouter);
router.use('/tags', tagsRouter);
router.use('/users', usersRouter);

router.get('*', function (req, res) {
  res.status(404).send(`ressource ${req.path} not found`);
});

export default router;
