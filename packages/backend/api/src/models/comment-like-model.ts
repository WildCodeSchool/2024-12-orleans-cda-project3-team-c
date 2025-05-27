import type { QueryError } from '@app/backend-shared';
import { db } from '@app/backend-shared';

export default {
  // GET **************************************************
  getCommentLikesCountByComment(commentId: number) {
    return db
      .selectFrom('comment_like')
      .select(({ fn }) => [fn.count<number>('comment_id').as('like_count')])
      .where('comment_id', '=', commentId)
      .executeTakeFirst();
  },

  // POST ****************************************
  async addCommentLike(commentId: number, userId: number) {
    try {
      await db
        .insertInto('comment_like')
        .values({
          comment_id: commentId,
          user_id: userId,
        })
        .execute();

      const commentLikesCount =
        await this.getCommentLikesCountByComment(commentId);

      return { isLiked: true, likeCount: commentLikesCount?.like_count };
    } catch (error) {
      if ((error as QueryError).errno === 1062) {
        const commentLikesCount =
          await this.getCommentLikesCountByComment(commentId);

        return { isLiked: true, likeCount: commentLikesCount?.like_count };
      }

      console.error('Something went wrong while liking the comment', error);
    }
  },

  // DELETE **************************************************
  async deleteCommentLike(commentId: number, userId: number) {
    try {
      await db
        .deleteFrom('comment_like')
        .where('comment_id', '=', commentId)
        .where('user_id', '=', userId)
        .execute();

      const commentLikesCount =
        await this.getCommentLikesCountByComment(commentId);
      return { isLiked: false, likeCount: commentLikesCount?.like_count };
    } catch (error) {
      console.error('Something went wrong while unliking the comment', error);
    }
  },
};
