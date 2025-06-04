import type { PostLike, PostLikeItem } from '@app/api';

import ApiConnection from './api-connection';

class PostLikeApiConnection extends ApiConnection {
  constructor(ressource = 'posts') {
    super(ressource);
  }

  async likePost(postId: number) {
    try {
      const response = await fetch(`${this.ressourceUrl}/${postId}/like`, {
        method: 'POST',
        credentials: 'include',
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
      const response = await fetch(`${this.ressourceUrl}/${postId}/like`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        return (await response.json()) as PostLike;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getPostLikes(postId: number, page = 1) {
    try {
      const response = await fetch(
        `${this.ressourceUrl}/${postId}/likes?page=${page}`,
      );

      if (response.ok) {
        return (await response.json()) as PostLikeItem[];
      } else {
        throw new Error('Error while fetching likes page');
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

export default new PostLikeApiConnection();
