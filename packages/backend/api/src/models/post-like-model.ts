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
      .innerJoin('post', 'post.id', 'post_like.post_id')
      .where('post.user_id', '=', userId)
      .executeTakeFirst();
  },

  getLikesByPost(postId: number, userId: number, page: number) {
    return db
      .selectFrom('post_like')
      .innerJoin('user', 'user.id', 'post_like.user_id')
      .innerJoin(
        'account_status',
        'user.account_status_id',
        'account_status.id',
      )
      .select((eb) => [
        'user.id as id',
        'user.username',
        'user.profile_picture',
        'account_status.name as status',
        eb
          .selectFrom('follow_up')
          .select('follow_up.created_at as isFollowing')
          .where('follow_up.follower_id', '=', userId)
          .whereRef('follow_up.followee_id', '=', 'user.id')
          .as('isFollowing'),
      ])
      .where('post_like.post_id', '=', postId)
      .orderBy('post_like.created_at')
      .limit(100)
      .offset(page * 100 - 100)
      .execute();
  },

  // POST **************************************************
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
        const postLikesCount = await this.getPostsLikesCountByPost(postId);
        return { isLiked: true, likeCount: postLikesCount?.like_count };
      }

      console.error('Something went wrong while liking the post', error);
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
      console.error('Something went wrong while unliking the post', error);
    }
  },
};
