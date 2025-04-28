// src/router.ts
import express from 'express';

import authMiddleware from './middlewares/auth.middleware';
import loginGuards from './middlewares/login.guards';
import loginRouter, { cookieRouterGet } from './subrouters/login-router';
import logoutRouter from './subrouters/logout-router';
import postsRouter from './subrouters/posts-router';
import tagsRouter from './subrouters/tags-router';
import usersRouter from './subrouters/users-router';

const router = express.Router();

// Middleware to check if the user is authenticated
router.use(authMiddleware);
// users registration
router.use('/users', usersRouter);

router.use('/login', loginRouter);

//login guards il faudra mettre mettre toutes les routes qui necessitent d'etre authentifié
router.use(loginGuards);
router.use('/posts', postsRouter);
router.use('/tags', tagsRouter);

router.use('/logout', logoutRouter);

router.use('/cookie', cookieRouterGet);

router.use('*', (req, res) => {
  res.status(404).json({ message: `Resource ${req.path} not found` });
});

export default router;
