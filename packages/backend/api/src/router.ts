import express from 'express';

import authMiddleware from './middlewares/auth.middleware';
import loginGuards from './middlewares/login.guards';
import authRouter from './subrouters/auth-router';
import postsRouter from './subrouters/posts-router';
import tagsRouter from './subrouters/tags-router';

// type MulterRequest = Request & {
//   file: Express.Multer.File;
// };

const router = express.Router();

// Middleware to check if the user is authenticated
router.use(authMiddleware);

router.use('/auth', authRouter);

//login guards il faudra mettre mettre toutes les routes qui necessitent d'etre authentifié
router.use(loginGuards);
router.use('/posts', postsRouter);
router.use('/tags', tagsRouter);

router.use('*', (req, res) => {
  res.status(404).json({ message: `Resource ${req.path} not found` });
});

export default router;
