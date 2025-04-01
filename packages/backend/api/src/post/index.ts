import express from 'express';

const postRouter = express.Router();

// GET
postRouter.get('/:id', function (req, res) {
  res.send('Getting a specified post');
});
postRouter.get('/page/:number', function (req, res) {
  res.send('Getting a post page');
});
// POST

// UPDATE

// DELETE

export default postRouter;
