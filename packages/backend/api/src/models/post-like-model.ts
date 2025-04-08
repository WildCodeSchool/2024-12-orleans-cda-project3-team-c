import { jsonObjectFrom } from 'kysely/helpers/mysql';

import type { QueryError } from '@app/backend-shared';
import { db } from '@app/backend-shared';

export default {
  // GET **************************************************
  getPostsLikesCountByPost(postId: number) {
    return db
      .selectFrom('post_like')
      .select(({ fn }) => [fn.count<number>('post_id').as('like_count')])
      .where('post_id', '=', postId)
      .executeTakeFirst();
  },

  getPostsLikesCountByGiver(userId: number) {
    return db
      .selectFrom('post_like')
      .select(({ fn }) => [fn.count<number>('user_id').as('like_count')])
      .where('user_id', '=', userId)
      .executeTakeFirst();
  },

  getPostsLikesCountByReceiver(userId: number) {
    return db
      .selectFrom('post_like')
      .select(({ fn }) => [fn.count<number>('post_id').as('like_count')])
      .innerJoin('post', (join) =>
        join.onRef('post.id', '=', 'post_like.post_id'),
      )
      .where('post.user_id', '=', userId)
      .executeTakeFirst();
  },

  // POST ****************************************
  async addPostLike(postId: number, userId: number) {
    try {
      await db
        .insertInto('post_like')
        .values({
          post_id: postId,
          user_id: userId,
        })
        .execute();

      const postLikesCount = await this.getPostsLikesCountByPost(postId);

      return { isLiked: true, likeCount: postLikesCount?.like_count };
    } catch (error) {
      if ((error as QueryError).errno === 1062) {
        console.log('there');
        console.log(error);

        const postLikesCount = await this.getPostsLikesCountByPost(postId);
        return { isLiked: true, likeCount: postLikesCount?.like_count };
      }

      console.error('Something went wrong while liking the post');
    }
  },
  // DELETE **************************************************
  async deletePostLike(postId: number, userId: number) {
    try {
      await db
        .deleteFrom('post_like')
        .where('post_id', '=', postId)
        .where('user_id', '=', userId)
        .execute();
      const postLikesCount = await this.getPostsLikesCountByPost(postId);
      return { isLiked: false, likeCount: postLikesCount?.like_count };
    } catch (error) {
      console.error('Something went wrong while unliking the post');
    }
  },
};
