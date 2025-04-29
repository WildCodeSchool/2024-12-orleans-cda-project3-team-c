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
  async getUserSuggestionsForUser(userId: number) {
    return db
      .selectFrom('user')
      .leftJoin('follow_up', (join) =>
        join.onRef('follow_up.follower_id', '=', 'user.id'),
      )
      .select((eb) => [
        'user.id',
        'user.username',
        'user.profile_picture',
        eb
          .selectFrom('follow_up')
          .select(({ fn }) =>
            fn.count<number>('follow_up.followee_id').as('follower_count'),
          )
          .whereRef('followee_id', '=', 'user.id')
          .as('follower_count'),
      ])
      .where('user.id', '!=', userId)
      .where((eb) =>
        eb(
          'user.id',
          'not in',
          eb
            .selectFrom('follow_up')
            .select('followee_id')
            .where('follower_id', '=', userId),
        ),
      )
      .groupBy('user.id')
      .limit(5)
      .execute();
  },
};

// eb('follower_id', 'is', null)
