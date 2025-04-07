import type { PostLike } from '@app/api';

import ApiConnection from './api-connection';

class PostLikeApiConnection extends ApiConnection {
  constructor(ressource = 'postlikes') {
    super(ressource);
  }

  async likePost(postId: number) {
    try {
      const response = await fetch(`${this.ressourceUrl}/${postId}`, {
        method: 'POST',
      });

      if (response.ok) {
        return (await response.json()) as PostLike;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async unlikePost(postId: number) {
    try {
      const response = await fetch(`${this.ressourceUrl}/${postId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        return (await response.json()) as PostLike;
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export default new PostLikeApiConnection();
