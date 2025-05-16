import express from 'express';

import {
  getPostsInfoInTagBySearch,
  getUsersInfoBySearch,
} from '@/models/search-model';

const searchRouter = express.Router();

searchRouter.get('/', async (req, res) => {
  const searchQuery = req.query.search as string;
  const userLimit = parseInt(req.query.userLimit as string, 10) || 3;
  const postByTagLimit = parseInt(req.query.postByTagLimit as string, 10) || 3;

  if (!searchQuery || searchQuery.trim() === '') {
    res.status(400).json({ error: 'Search query is required' });
    return;
  }

  try {
    const [usersResults, postsResults] = await Promise.all([
      getUsersInfoBySearch(searchQuery, userLimit),
      getPostsInfoInTagBySearch(searchQuery, postByTagLimit),
    ]);

    res.json({
      users: usersResults,
      posts: postsResults,
    });

    return;
  } catch (error) {
    console.error('Error during search', error);
    res.status(500).json({ error: 'Server error' });
    return;
  }
});

export default searchRouter;
