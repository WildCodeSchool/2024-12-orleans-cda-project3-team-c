import { jsonArrayFrom } from 'kysely/helpers/mysql';

import { db } from '@app/backend-shared';

export default {
  async getUserProfileById(userId: number) {
    const profile = await db
      .selectFrom('user')
      .select((eb) => [
        'user.id',
        'user.username',
        'user.profile_picture',
        'user.biography',
        'user.notoriety',
        eb
          .selectFrom('follow_up')
          .select(({ fn }) => fn.countAll<number>().as('followersCount'))
          .where('follow_up.followee_id', '=', userId)
          .as('followersCount'),
        eb
          .selectFrom('follow_up')
          .select(({ fn }) => fn.countAll<number>().as('followingCount'))
          .where('follow_up.follower_id', '=', userId)
          .as('followingCount'),
        jsonArrayFrom(
          eb
            .selectFrom('post')
            .leftJoin('post_like', 'post_like.post_id', 'post.id')
            .leftJoin('comment', 'comment.post_id', 'post.id')
            .select((eb2) => [
              'post.id',
              'post.picture',
              eb2.fn.count<number>('post_like.user_id').as('likeCount'),
              eb2.fn.count<number>('comment.id').as('commentCount'),
            ])
            .where('post.user_id', '=', userId)
            .groupBy('post.id')
            .orderBy('post.created_at', 'desc')
            .limit(8),
        ).as('posts'),
      ])
      .where('user.id', '=', userId)
      .executeTakeFirst();

    if (!profile) {
      return null;
    }

    return {
      ...profile,
      followersCount: profile.followersCount ?? 0,
      followingCount: profile.followingCount ?? 0,
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
