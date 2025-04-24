import { db } from '@app/backend-shared';

export default {
  async getUserWithFollowersCount(userId: number) {
    const userResult = await db
      .selectFrom('user')
      .select(['id', 'username', 'profile_picture'])
      .where('id', '=', userId)
      .executeTakeFirst();

    const followersCountResult = await db
      .selectFrom('follow_up')
      .select(({ fn }) => [
        fn.count<number>('follower_id').as('followers_count'),
      ])
      .where('followee_id', '=', userId)
      .executeTakeFirst();

    return {
      ...userResult,
      followers_count: followersCountResult?.followers_count ?? 0,
    };
  },

  async getAllUsersWithFollowersCount() {
    const usersResult = await db
      .selectFrom('user')
      .select(['id', 'username', 'profile_picture'])
      .execute();

    const usersWithFollowers = await Promise.all(
      usersResult.map(async (user) => {
        const followersCountResult = await db
          .selectFrom('follow_up')
          .select(({ fn }) => [
            fn.count<number>('follower_id').as('followers_count'),
          ])
          .where('followee_id', '=', user.id)
          .executeTakeFirst();

        return {
          ...user,
          followers_count: followersCountResult?.followers_count ?? 0,
        };
      }),
    );

    return usersWithFollowers;
  },
};
