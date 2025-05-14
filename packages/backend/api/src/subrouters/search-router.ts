import express from 'express';

import {
  getPostsInfoInTagBySearch,
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
  const userLimit = parseInt(req.query.userLimit as string, 6) || 3;
  const postByTagLimit = parseInt(req.query.postByTagLimit as string, 6) || 3;

  if (!searchQuery || searchQuery.trim() === '') {
    res.status(400).json({ error: 'Search query is required' });
    return;
  }

  try {
    const usersResults: UserSearchResult[] = await getUsersInfoBySearch(
      searchQuery,
      userLimit,
    );

    const postsResults: PostSearchResult[] = await getPostsInfoInTagBySearch(
      searchQuery,
      postByTagLimit,
    );

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
