import express from 'express';

import postsRouter from './post';

const router = express.Router();

router.use('/post', postRouter);
router.get('*', function (req, res) {
  res.status(404).send(`ressource ${req.path} not found`);
});

export default router;
