import express from 'express';

import {
  default as cookkieRouterGet,
  default as userLoginRouter,
} from './subrouters/login-router';
import postsRouter from './subrouters/posts-router';
import tagsRouter from './subrouters/tags-router';
import usersRouter from './subrouters/users-router';

const router = express.Router();

router.use('/posts', postsRouter);
router.use('/users', usersRouter);
router.use('/tags', tagsRouter);

router.use('/login', userLoginRouter);
router.use('/register', usersRouter);
router.use('/cookie', cookkieRouterGet);

router.get('*', function (req, res) {
  res.status(404).send(`ressource ${req.path} not found`);
});

export default router;
