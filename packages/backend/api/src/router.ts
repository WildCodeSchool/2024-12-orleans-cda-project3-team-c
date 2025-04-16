// src/router.ts
import express from 'express';
import type { Request } from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import followsRouter from './subrouters/follows-router';
import postsRouter from './subrouters/posts-router';
import tagsRouter from './subrouters/tags-router';
import usersRouter from './subrouters/users-router';

type MulterRequest = Request & {
  file: Express.Multer.File;
};

const router = express.Router();

// Résolution des chemins pour __dirname, nécessaire pour Express statique
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Utilisation de `express.static` pour servir des images de profil utilisateurs
router.use(
  '/users/pictures',
  express.static(join(__dirname, '..', 'public', 'pictures', 'users')),
);

// Enregistrement des sous-routes
router.use('/posts', postsRouter);
router.use('/tags', tagsRouter);
router.use('/users', usersRouter);
router.use('/follows', followsRouter);

// Gestion des routes non trouvées
router.get('*', function (req, res) {
  res.status(404).send(`Ressource ${req.path} non trouvée`);
});

export default router;
