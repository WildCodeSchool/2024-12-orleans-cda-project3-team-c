import express, { type Request, type Response } from 'express';

import postModel from '@/models/post-model';
import userModel from '@/models/user-model';

const usersRouter = express.Router();

// Typage de la route GET /users/me
usersRouter.get(
  '/profile',
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const userId = 1; // ID de l'utilisateur (ici, temporairement en dur)

      const user = await userModel.getUserById(userId);
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
      }

      // Utilisation de getFeedPage() pour récupérer les posts de l'utilisateur
      const posts = await postModel.getFeedPage(1, userId); // Simuler la page 1

      // Formatage des données pour la réponse
      const profile = {
        username: user.username,
        profile_picture: user.profile_picture,
        bio: user.bio,
        posts: posts.map((post) => ({
          id: post.id,
          picture: post.picture,
          description: post.description,
          created_at: post.created_at,
          likeCount: post.likeCount,
          commentCount: post.commentCount,
        })),
      };

      // Envoi de la réponse
      return res.json(profile); // Renvoie le profile sous forme de JSON
    } catch (err) {
      console.error('Erreur :', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
  },
);

export default usersRouter;
