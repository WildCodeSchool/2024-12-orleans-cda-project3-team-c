import express from 'express';

import authGuards from './middlewares/auth.guards';
import authMiddleware from './middlewares/auth.middleware';
import authRouter from './subrouters/auth-router';
import followUpsRouter from './subrouters/follow-ups-router';
import postsRouter from './subrouters/posts-router';
import suggestionRouter from './subrouters/suggestions-router';
import tagsRouter from './subrouters/tags-router';
import usersRouter from './subrouters/users-router';

const router = express.Router();

// Middleware to check if the user is authenticated
router.use(authMiddleware);

router.use('/auth', authRouter);

//login guards il faudra mettre mettre toutes les routes qui necessitent d'etre authentifié
router.use(authGuards);
router.use('/follows', followUpsRouter);
router.use('/posts', postsRouter);
router.use('/suggestion', suggestionRouter);
router.use('/tags', tagsRouter);
router.use('/users', usersRouter);

router.use('*', (req, res) => {
  res.status(404).json({ message: `Resource ${req.path} not found` });
});

export default router;
