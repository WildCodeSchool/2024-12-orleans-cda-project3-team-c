// src/router.ts
import express from 'express';

import postsRouter from './subrouters/posts-router';
import tagsRouter from './subrouters/tags-router';
import usersRouter from './subrouters/users-router';

const router = express.Router();

router.use('/posts', postsRouter);
router.use('/tags', tagsRouter);
router.use('/users', usersRouter);

router.use('*', (req, res) => {
  res.status(404).send(`Resource ${req.path} not found`);
});

export default router;
