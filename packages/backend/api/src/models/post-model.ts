import { jsonObjectFrom } from 'kysely/helpers/mysql';

import { db } from '@app/backend-shared';

import notNull from '@/utils/not-null';

export default {
  create(picture: string, description: string, author: number) {
    return db
      .insertInto('post')
      .values({ picture, description, user_id: author })
      .executeTakeFirst();
  },

  getPost(postId: number, userId: number) {
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
        notNull(
          jsonObjectFrom(
            eb
              .selectFrom('user')
              .leftJoin('follow_up', (join) =>
                join
                  .onRef('follow_up.followee_id', '=', 'user.id')
                  .on((eb) => eb('follow_up.follower_id', '=', userId)),
              )
              .innerJoin(
                'account_status',
                'account_status.id',
                'user.account_status_id',
              )
              .select([
                'user.id',
                'username',
                'profile_picture',
                'follow_up.created_at as isFollowing',
                'account_status.name as status',
              ])
              .whereRef('user.id', '=', 'post.user_id'),
          ),
        ).as('author'),
      ])
      .where('post.id', '=', postId)
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
        notNull(
          jsonObjectFrom(
            eb
              .selectFrom('user')
              .leftJoin('follow_up', (join) =>
                join
                  .onRef('follow_up.followee_id', '=', 'user.id')
                  .on((eb) => eb('follow_up.follower_id', '=', userId)),
              )
              .innerJoin(
                'account_status',
                'account_status.id',
                'user.account_status_id',
              )
              .select([
                'user.id',
                'username',
                'profile_picture',
                'follow_up.created_at as isFollowing',
                'account_status.name as status',
              ])
              .whereRef('user.id', '=', 'post.user_id'),
          ),
        ).as('author'),
      ])
      .where('post.user_id', '!=', userId)
      .groupBy('post.id')
      .orderBy('post.created_at', 'desc')
      .limit(4)
      .offset(page * 4 - 4)
      .execute();
  },

  getFeedPageByUser(username: string, page: number, userId: number) {
    return db
      .selectFrom('post')
      .innerJoin('user', 'user.id', 'post.user_id')
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
        notNull(
          jsonObjectFrom(
            eb
              .selectFrom('user')
              .leftJoin('follow_up', (join) =>
                join
                  .onRef('follow_up.followee_id', '=', 'user.id')
                  .on((eb) => eb('follow_up.follower_id', '=', userId)),
              )
              .innerJoin(
                'account_status',
                'account_status.id',
                'user.account_status_id',
              )
              .select([
                'user.id',
                'username',
                'profile_picture',
                'follow_up.created_at as isFollowing',
                'account_status.name as status',
              ])
              .whereRef('user.id', '=', 'post.user_id'),
          ),
        ).as('author'),
      ])
      .where('user.username', '=', username)
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

  getUserPostPreviews(userId: number, page: number) {
    return db
      .selectFrom('post')
      .select(['post.id', 'post.picture'])
      .where('post.user_id', '=', userId)
      .groupBy('post.id')
      .orderBy('post.created_at', 'desc')
      .limit(8)
      .offset(page * 8 - 8)
      .execute();
  },

  getPostAuthorId(postId: number) {
    return db
      .selectFrom('post')
      .select(['user_id'])
      .where('post.id', '=', postId)
      .executeTakeFirst();
  },

  async delete(postId: number) {
    const trx = await db.startTransaction().execute();

    try {
      await trx
        .deleteFrom('post_like')
        .where('post_like.post_id', '=', postId)
        .execute();

      await trx
        .deleteFrom('comment_like')
        .where((eb) =>
          eb(
            'comment_like.comment_id',
            'in',
            eb
              .selectFrom('comment')
              .select('comment.id')
              .where('comment.post_id', '=', postId),
          ),
        )
        .execute();

      await trx
        .deleteFrom('comment')
        .where('comment.post_id', '=', postId)
        .execute();

      await trx.deleteFrom('post_tag').where('post_id', '=', postId).execute();

      await trx.deleteFrom('post').where('post.id', '=', postId).execute();

      await trx.commit().execute();
      return { ok: true };
    } catch (error) {
      console.error(error);
      await trx.rollback().execute();
      return { ok: false };
    }
  },
};
