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
      const followerCount = await this.getFollowerCount(followeeId);
      return { isFollowing: true, followerCount: followerCount?.follow_count };
    } catch (error) {
      if ((error as QueryError).code === 'ER_DUP_ENTRY') {
        const followerCount = await this.getFollowerCount(followeeId);
        return {
          isFollowing: true,
          followerCount: followerCount?.follow_count,
        };
      }
      console.error('Error adding follow:', error);
      const followerCount = await this.getFollowerCount(followeeId);
      return { isFollowing: false, followerCount: followerCount?.follow_count };
    }
  },

  async getFollowees(followerId: number) {
    return db
      .selectFrom('follow_up as f')
      .innerJoin('user as u', 'u.id', 'f.followee_id')
      .select(['u.id', 'u.username', 'u.profile_picture'])
      .where('f.follower_id', '=', followerId)
      .execute();
  },

  async getFollowers(followeeId: number) {
    return db
      .selectFrom('follow_up as f')
      .innerJoin('user as u', 'u.id', 'f.follower_id')
      .select(['u.id', 'u.username', 'u.profile_picture'])
      .where('f.followee_id', '=', followeeId)
      .execute();
  },

  async deleteFollow(followerId: number, followeeId: number) {
    try {
      await db
        .deleteFrom('follow_up')
        .where('follower_id', '=', followerId)
        .where('followee_id', '=', followeeId)
        .execute();
      const followerCount = await this.getFollowerCount(followeeId);
      return { isFollowing: false, followerCount: followerCount?.follow_count };
    } catch (error) {
      console.error('Error deleting follow:', error);
      const followerCount = await this.getFollowerCount(followeeId);
      return { isFollowing: true, followerCount: followerCount?.follow_count };
    }
  },

  getFollowerCount(userId: number) {
    return db
      .selectFrom('follow_up')
      .select(({ fn }) => [fn.count<number>('follower_id').as('follow_count')])
      .where('followee_id', '=', userId)
      .executeTakeFirst();
  },

  async getFollowersCount(userId: number): Promise<number> {
    const result = await db
      .selectFrom('follow_up as f')
      .innerJoin('user as u', 'u.id', 'f.follower_id')
      .select((eb) => eb.fn.countAll<number>().as('count'))
      .where('f.followee_id', '=', userId)
      .executeTakeFirst();

    return result?.count ?? 0;
  },

  async getFollowingCount(userId: number): Promise<number> {
    const result = await db
      .selectFrom('follow_up as f')
      .innerJoin('user as u', 'u.id', 'f.follower_id')
      .select((eb) => eb.fn.countAll<number>().as('count'))
      .where('f.followee_id', '=', userId)
      .executeTakeFirst();

    return result?.count ?? 0;
  },
};
