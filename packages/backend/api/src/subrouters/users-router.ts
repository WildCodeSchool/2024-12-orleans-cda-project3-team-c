import express from 'express';

const usersRouter = express.Router();

// GET **************************************************
usersRouter.get('/:param', function () {
  // Getting a specified user from id or username
});

usersRouter.get('/:id/posts', function () {
  // Getting posts from a specified user
});

usersRouter.get('/tag/:tag', function () {
  // Getting posts from a specified tag
});

// POST **************************************************

// UPDATE **************************************************

// DELETE **************************************************
export default usersRouter;
