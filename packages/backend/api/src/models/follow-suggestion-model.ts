import type { QueryError } from '@app/backend-shared';
import { db } from '@app/backend-shared';

export default {
  async checkFollowStatus(followerId: number, followeeId: number) {
    const result = await db
      .selectFrom('follow_up')
      .select(['follower_id', 'followee_id'])
      .where('follower_id', '=', followerId)
      .where('followee_id', '=', followeeId)
      .executeTakeFirst();

    return { isFollowing: result !== undefined };
  },

  getFollowersSuggestionCount(userId: number) {
    return db
      .selectFrom('follow_up')
      .select(({ fn }) => [
        fn.count<number>('follower_id').as('followers_count'),
      ])
      .where('followee_id', '=', userId)
      .executeTakeFirst();
  },

  getFollowingSuggestionCount(userId: number) {
    return db
      .selectFrom('follow_up')
      .select(({ fn }) => [
        fn.count<number>('followee_id').as('following_count'),
      ])
      .where('follower_id', '=', userId)
      .executeTakeFirst();
  },

  async addFollowSuggestion(followerId: number, followeeId: number) {
    try {
      await db
        .insertInto('follow_up')
        .values({
          follower_id: followerId,
          followee_id: followeeId,
        })
        .execute();

      return { isFollowing: true };
    } catch (error) {
      if ((error as QueryError).code === 'ER_DUP_ENTRY') {
        return { isFollowing: true };
      }
      console.error('Error adding follow:', error);
      return { isFollowing: false };
    }
  },

  async deleteFollowSuggestion(followerId: number, followeeId: number) {
    try {
      await db
        .deleteFrom('follow_up')
        .where('follower_id', '=', followerId)
        .where('followee_id', '=', followeeId)
        .execute();

      return { isFollowing: false };
    } catch (error) {
      console.error('Error deleting follow:', error);
      return { isFollowing: true };
    }
  },
};
