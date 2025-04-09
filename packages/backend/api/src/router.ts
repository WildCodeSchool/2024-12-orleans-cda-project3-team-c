import express from 'express';

import {
  default as loginRouter,
  default as registerRouter,
} from './subrouters/connexion-router';
import postsRouter from './subrouters/posts-router';
import tagsRouter from './subrouters/tags-router';
import usersRouter from './subrouters/users-router';

const router = express.Router();

router.use('/posts', postsRouter);
router.use('/users', usersRouter);
router.use('/tags', tagsRouter);

router.use('/login', loginRouter);
router.use('/register', registerRouter);

router.get('*', function (req, res) {
  res.status(404).send(`ressource ${req.path} not found`);
});

export default router;
