import express from 'express';

import followRouter from './subrouters/follow-router';
import postsRouter from './subrouters/posts-router';
import tagsRouter from './subrouters/tags-router';
import usersRouter from './subrouters/user-router';

const router = express.Router();

router.use('/follow', followRouter);
router.use('/posts', postsRouter);
router.use('/tags', tagsRouter);
router.use('/users', usersRouter);

router.get('*', function (req, res) {
  res.status(404).send(`ressource ${req.path} not found`);
});

export default router;
