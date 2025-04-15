// src/router.ts
import express from 'express';
import path, { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import followsRouter from './subrouters/follows-router';
import postsRouter from './subrouters/posts-router';
import tagsRouter from './subrouters/tags-router';
import usersRouter from './subrouters/users-router';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.use(
  '/users/pictures',
  express.static(join(__dirname, '..', 'public', 'pictures', 'users')),
);

// All subroutes
router.use('/posts', postsRouter);
router.use('/tags', tagsRouter);
router.use('/users', usersRouter);
router.use('/follows', followsRouter);

// Catch-all route
router.get('*', function (req, res) {
  res.status(404).send(`ressource ${req.path} not found`);
});

export default router;
