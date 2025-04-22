import express from 'express';

import loginGuards from './middlewares/login.guards';
import loginMiddleware from './middlewares/login.middleware';
import userLoginRouter, { cookkieRouterGet } from './subrouters/login-router';
import userLogout from './subrouters/logout-router';
import postsRouter from './subrouters/posts-router';
import tagsRouter from './subrouters/tags-router';
import usersRouter from './subrouters/users-router';

const router = express.Router();

router.use('/register', usersRouter);

router.use('/login', userLoginRouter);
router.use('/logout', userLogout);

// Middleware to check if the user is authenticated
router.use(loginMiddleware);

//login guards il faudra mettre mettre toutes les routes qui necessitent d'etre authentifié
router.use(loginGuards);
router.use('/posts', postsRouter);
router.use('/tags', tagsRouter);
router.use('/users', usersRouter);

router.use('/cookie', cookkieRouterGet);

router.get('*', function (req, res) {
  res.status(404).send(`ressource ${req.path} not found`);
});

export default router;
