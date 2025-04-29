// src/router.ts
import express from 'express';

import followUpsRouter from './subrouters/follow-ups-router';
import postsRouter from './subrouters/posts-router';
import suggestionRouter from './subrouters/suggestions-router';
import tagsRouter from './subrouters/tags-router';
import usersRouter from './subrouters/users-router';

const router = express.Router();

router.use('/follows', followUpsRouter);
router.use('/posts', postsRouter);
router.use('/suggestion', suggestionRouter);
router.use('/tags', tagsRouter);
router.use('/users', usersRouter);

router.use('*', (req, res) => {
  res.status(404).json({ message: `Resource ${req.path} not found` });
});

export default router;
