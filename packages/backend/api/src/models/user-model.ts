import { jsonArrayFrom } from 'kysely/helpers/mysql';

import { db } from '@app/backend-shared';

export default {
  async getUserById(userId: number) {
    return await db
      .selectFrom('user')
      .select([
        'id',
        'username',
        'profile_picture',
        'email',
        'biography',
        'notoriety',
      ])
      .where('id', '=', userId)
      .executeTakeFirst();
  },

  async getUserByUsernameOrId(parameter: string) {
    const isNumericId = /^\d+$/.test(parameter);

    return await db
      .selectFrom('user')
      .select([
        'id',
        'username',
        'profile_picture',
        'email',
        'biography',
        'notoriety',
      ])
      .where((eb) =>
        isNumericId
          ? eb('id', '=', Number(parameter))
          : eb('username', '=', parameter),
      )
      .executeTakeFirst();
  },

  async getUserProfileById(userId: number) {
    return await db
      .selectFrom('user')
      .select((eb) => [
        'user.id',
        'user.username',
        'user.profile_picture',
        'user.biography',
        'user.notoriety',
        eb
          .selectFrom('follow_up')
          .select(({ fn }) => fn.countAll().as('followersCount'))
          .where('follow_up.followee_id', '=', userId)
          .as('followersCount'),
        eb
          .selectFrom('follow_up')
          .select(({ fn }) => fn.countAll().as('followingCount'))
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
              'post.description',
              'post.created_at',
              eb2.fn.count<number>('post_like.user_id').as('likeCount'),
              eb2.fn.count<number>('comment.id').as('commentCount'),
            ])
            .where('post.user_id', '=', userId)
            .groupBy('post.id'),
        ).as('posts'),
      ])
      .where('user.id', '=', userId)
      .executeTakeFirst();
  },
};
