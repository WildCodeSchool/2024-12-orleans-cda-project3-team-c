import type { CommentLike } from '@app/api';

import ApiConnection from './api-connection';

class CommentLikeApiConnection extends ApiConnection {
  constructor(ressource = 'comments') {
    super(ressource);
  }

  async likeComment(commentId: number) {
    try {
      const response = await fetch(`${this.ressourceUrl}/${commentId}/like`, {
        method: 'POST',
      });

      if (response.ok) {
        return (await response.json()) as CommentLike;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async unlikeComment(commentId: number) {
    try {
      const response = await fetch(`${this.ressourceUrl}/${commentId}/like`, {
        method: 'DELETE',
      });

      if (response.ok) {
        return (await response.json()) as CommentLike;
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export default new CommentLikeApiConnection();
