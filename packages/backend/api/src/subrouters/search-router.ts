import express from 'express';

import {
  getPostsInfoBySearch,
  getUsersInfoBySearch,
} from '@/models/search-model';

const searchRouter = express.Router();

searchRouter.get('/', async (req, res) => {
  try {
    const searchResults = await getUsersInfoBySearch(
      req.query.search as string,
    );

    const postsResults = await getPostsInfoBySearch(req.query.search as string);

    console.log('searchResults', searchResults);
    console.log('postsResults', postsResults);
    // if (!searchResults) {
    //   res.status(404).json({ error: 'Aucun utilisateur trouvé' });
    //   return;
    // }
    res.json(searchResults);
    return;
  } catch (err) {
    console.error('Erreur dans GET /search :', err);
    res.status(500).json({ error: 'Erreur serveur' });
    return;
  }
});

export default searchRouter;
