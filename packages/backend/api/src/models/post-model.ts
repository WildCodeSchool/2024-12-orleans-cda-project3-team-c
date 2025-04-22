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
    return (
      db
        .selectFrom('post')
        .leftJoin('post_like', (join) =>
          join
            .onRef('post_like.post_id', '=', 'post.id')
            .on((eb) => eb('post_like.user_id', '=', userId)),
        )
        .leftJoin('comment', 'comment.post_id', 'post.id')
        .select((eb) => [
          'post.id',
          'post.picture',
          'post.description',
          'post.created_at',
          'post_like.created_at as isLiked',
          eb.fn.count<number>('post_like.post_id').as('likeCount'),
          eb.fn.count<number>('comment.id').as('commentCount'),
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
        // A l'issue du développement, passer les limites à 20
        .limit(4)
        .offset(page * 4 - 4)
        .execute()
    );
  },

  getOwnPostsCount(userId: number) {
    return db
      .selectFrom('post')
      .select(({ fn }) => fn.countAll().as('count'))
      .where('post.user_id', '=', userId)
      .executeTakeFirst();
  },
};
