import express from 'express';

import {
  getPostsInfoBySearch,
  getUsersInfoBySearch,
} from '@/models/search-model';

type UserSearchResult = {
  id: number;
  username: string;
  profile_picture: string;
};

type PostSearchResult = {
  id: number;
  description: string | null;
  picture: string;
};

const searchRouter = express.Router();

searchRouter.get('/', async (req, res) => {
  const searchQuery = req.query.search as string;

  if (!searchQuery || searchQuery.trim() === '') {
    res.status(400).json({ error: 'Search query is required' });
    return;
  }

  try {
    const usersResults: UserSearchResult[] =
      await getUsersInfoBySearch(searchQuery);

    const postsResults: PostSearchResult[] =
      await getPostsInfoBySearch(searchQuery);

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
