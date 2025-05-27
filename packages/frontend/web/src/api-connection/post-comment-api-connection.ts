import type { PostComment } from '@app/api';

import ApiConnection from './api-connection';

type PostCommentType = {
  ok: boolean;
  comment?: PostComment;
  message?: string;
};

class PostCommentApiConnection extends ApiConnection {
  constructor(ressource = 'posts') {
    super(ressource);
  }

  async postComment(
    postId: number,
    text: string,
    respondsTo: number | null = null,
  ): Promise<PostCommentType> {
    try {
      const response = await fetch(`${this.ressourceUrl}/${postId}/comment`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          text,
          respondsTo,
        }),
      });

      if (response.ok) {
        return (await response.json()) as PostCommentType;
      } else {
        throw new Error('Error while posting comment');
      }
    } catch (error) {
      console.error(error);
      return { ok: false };
    }
  }
}

export default new PostCommentApiConnection();
