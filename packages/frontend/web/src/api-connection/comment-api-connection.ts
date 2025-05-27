import type { PostComment } from '@app/api';

import ApiConnection from './api-connection';

class CommentApiConnection extends ApiConnection {
  constructor(ressource = 'comments') {
    super(ressource);
  }

  async getPostComments(postId: number, page = 1) {
    try {
      const response = await fetch(
        `${this.ressourceUrl}?postId=${postId}&page=${page}`,
      );

      if (response.ok) {
        return (await response.json()) as PostComment[];
      } else {
        throw new Error('Error while fetching comments page');
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

export default new CommentApiConnection();
