import express from 'express';

import followModel from '@/models/follow-model';
import postModel from '@/models/post-model';
import userModel from '@/models/user-model';

const usersRouter = express.Router();

usersRouter.get('/profile', async (req, res) => {
  try {
    const userId = 1; // temporaire
    const user = await userModel.getUserById(userId);

    if (!user) {
      res.status(404).json({ error: 'Utilisateur non trouvé' });
      return;
    }

    const posts = await postModel.getFeedPage(1, userId); // page 1 simulée
    const followersCount = await followModel.getFollowersCount(userId);
    const followingCount = await followModel.getFollowingCount(userId);

    const profile = {
      id: user.id,
      username: user.username,
      profile_picture: user.profile_picture,
      biography: user.biography,
      notoriety: user.notoriety,
      posts: posts.map((post) => ({
        id: post.id,
        picture: post.picture,
      })),
      followersCount,
      followingCount,
    };

    res.json(profile);
  } catch (err) {
    console.error('Erreur :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default usersRouter;
