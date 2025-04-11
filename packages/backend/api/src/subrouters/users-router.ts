import express from 'express';

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

    const profile = {
      username: user.username,
      profile_picture: `${req.protocol}://${req.get('host')}/api/users/pictures/${user.profile_picture}`,
      biography: user.biography,
      posts: posts.map((post) => ({
        id: post.id,
        picture: post.picture,
        description: post.description,
        created_at: post.created_at,
        likeCount: post.likeCount,
        commentCount: post.commentCount,
      })),
    };

    res.json(profile);
  } catch (err) {
    console.error('Erreur :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default usersRouter;
