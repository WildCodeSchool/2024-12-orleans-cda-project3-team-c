import type { QueryError } from '@app/backend-shared';
import { db } from '@app/backend-shared';

export default {
  async addFollow(followerId: number, followeeId: number) {
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

  async deleteFollow(followerId: number, followeeId: number) {
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
