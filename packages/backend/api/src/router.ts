// src/router.ts
import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import picturesRouter from '../public/pictures/users/user.png';
import followsRouter from './subrouters/follows-router';
import postsRouter from './subrouters/posts-router';
import tagsRouter from './subrouters/tags-router';
import usersRouter from './subrouters/users-router';

// import cdn from './index';

const router = express.Router();
// const __fileofname = fileURLToPath(import.meta.url);
// const __dirofname = dirname(__fileofname);

// router.use(
//   '/users/pictures',
//   express.static(join(__dirofname, '..', 'public', 'pictures', 'users')),
// );

router.use('/users/pictures', express.static(join('/cdn', picturesRouter)));

router.use('/posts', postsRouter);
router.use('/tags', tagsRouter);
router.use('/users', usersRouter);
router.use('/follows', followsRouter);

router.use('*', (req, res) => {
  res.status(404).send(`Resource ${req.path} not found`);
});

export default router;
