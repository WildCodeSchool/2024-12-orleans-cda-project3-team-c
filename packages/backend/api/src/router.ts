import express from 'express';

import postsRouter from './posts';

const router = express.Router();

router.use('/posts', postsRouter);
router.get('*', function (req, res) {
  res.status(404).send(`ressource ${req.path} not found`);
});

export default router;
