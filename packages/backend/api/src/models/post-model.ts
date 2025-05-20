import { jsonObjectFrom } from 'kysely/helpers/mysql';

import { db } from '@app/backend-shared';

export default {
  create(picture: string, description: string, author: number) {
    return db
      .insertInto('post')
      .values({ picture, description, user_id: author })
      .executeTakeFirst();
  },

  getFeedPage(page: number, userId: number) {
    return db
      .selectFrom('post')
      .select((eb) => [
        'post.id',
        'post.picture',
        'post.description',
        'post.created_at',
        eb
          .selectFrom('post_like')
          .select((eb) => [eb.fn.count('post_like.post_id').as('likeCount')])
          .whereRef('post_like.post_id', '=', 'post.id')

          .as('likeCount'),
        eb
          .selectFrom('comment')
          .select((eb) => [eb.fn.count('comment.post_id').as('commentCount')])
          .whereRef('comment.post_id', '=', 'post.id')
          .as('commentCount'),
        eb
          .selectFrom('post_like')
          .select(['post_like.created_at'])
          .whereRef('post_like.post_id', '=', 'post.id')
          .where('post_like.user_id', '=', userId)
          .as('isLiked'),
        jsonObjectFrom(
          eb
            .selectFrom('user')
            .leftJoin('follow_up', (join) =>
              join
                .onRef('follow_up.followee_id', '=', 'user.id')
                .on((eb) => eb('follow_up.follower_id', '=', userId)),
            )
            .select([
              'username',
              'profile_picture',
              'follow_up.created_at as isFollowing',
            ])
            .whereRef('user.id', '=', 'post.user_id'),
        ).as('author'),
      ])
      .where('post.user_id', '!=', userId)
      .groupBy('post.id')
      .orderBy('post.created_at', 'desc')
      .limit(4)
      .offset(page * 4 - 4)
      .execute();
  },

  getPostCountByUserId(userId: number) {
    return db
      .selectFrom('post')
      .select(({ fn }) => fn.countAll<number>().as('count'))
      .where('post.user_id', '=', userId)
      .executeTakeFirst();
  },
};
