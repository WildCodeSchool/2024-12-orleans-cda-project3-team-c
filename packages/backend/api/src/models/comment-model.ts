import { jsonObjectFrom } from 'kysely/helpers/mysql';

import { db } from '@app/backend-shared';

import notNull from '@/utils/not-null';

export default {
  getCommentsByPostId(postId: number, userId: number, page: number) {
    return db
      .selectFrom('comment')
      .select((eb) => [
        'comment.id',
        'comment.text',
        'comment.responds_to',
        'comment.created_at',
        eb
          .selectFrom('comment_like')
          .select((eb) => [
            eb.fn.count<number>('comment_like.comment_id').as('likeCount'),
          ])
          .whereRef('comment.id', '=', 'comment_like.comment_id')
          .as('likeCount'),
        eb
          .selectFrom('comment_like')
          .select(['comment_like.created_at'])
          .whereRef('comment_like.comment_id', '=', 'comment.id')
          .where('comment_like.user_id', '=', userId)
          .as('isLiked'),
        notNull(
          jsonObjectFrom(
            eb
              .selectFrom('user')
              .select(['username', 'profile_picture'])
              .whereRef('user.id', '=', 'comment.user_id'),
          ),
        ).as('author'),
      ])
      .where('comment.post_id', '=', postId)
      .groupBy('comment.id')
      .orderBy('comment.created_at', 'asc')
      .limit(8)
      .offset(page * 8 - 8)
      .execute();
  },
};
