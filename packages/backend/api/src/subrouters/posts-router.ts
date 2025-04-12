import express from 'express';

// import postModel from '@/models/post-model';
import followModel from '@/models/follow-model';
import postLikeModel from '@/models/post-like-model';

// Assurez-vous que votre modèle de suivi est importé

const postsRouter = express.Router();

// GET **************************************************
postsRouter.get('/:id', function (req, res) {
  // Vous pouvez créer une route pour obtenir les posts ou les followers/following
  // Exemple : obtenir le profil d'un utilisateur avec ses posts
  // Une autre route devrait être dédiée aux followers et following
});

// Route pour obtenir les followers d'un utilisateur
postsRouter.get('/:id/followers', async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  if (isNaN(userId)) {
    res.status(400).send('Invalid user ID');
    return;
  }

  const followersCount = await followModel.getFollowersCount(userId);
  res.json({ count: followersCount });
});

// Route pour obtenir les following d'un utilisateur
postsRouter.get('/:id/following', async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  if (isNaN(userId)) {
    res.status(400).send('Invalid user ID');
    return;
  }

  const followingCount = await followModel.getFollowingCount(userId);
  res.json({ count: followingCount });
});

// POST **************************************************
postsRouter.post('/:postId/like', async function (req, res) {
  const testConnectedUser = 1;

  const postId = +req.params.postId;

  if (!postId) {
    res.status(400).send('Bad request, you should provide a valid post id');
  }

  const data = await postLikeModel.addPostLike(postId, testConnectedUser);
  if (data) {
    res.json(data);
  } else {
    res.status(500).send('Something went wrong while liking post');
  }
});

// UPDATE **************************************************

// DELETE **************************************************
postsRouter.delete('/:postId/like', async function (req, res) {
  const testConnectedUser = 1;

  const postId = +req.params.postId;

  if (!postId) {
    res.status(400).send('Bad request, you should provide a valid post id');
  }

  const data = await postLikeModel.deletePostLike(postId, testConnectedUser);
  if (data) {
    res.json(data);
  } else {
    res.status(500).send('Something went wrong while unliking post');
  }
});

export default postsRouter;
