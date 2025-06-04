import { limits } from 'argon2';
import { sql } from 'kysely';

import { db } from '@app/backend-shared';

export default {
  async newLike(postId: number, likderId: number) {
    const insertion = await db
      .insertInto('notification')
      .values((eb) => ({
        type_id: eb
          .selectFrom('notification_type')
          .select(['id'])
          .where('name', '=', 'like'),
        recipient_id: eb
          .selectFrom('post')
          .select('post.user_id')
          .where('post.id', '=', postId),
        message: sql<string>`concat("@", ${eb.selectFrom('user').select('user.username').where('user.id', '=', likderId)}," liked your post.")`,
        redirect_to: postId,
      }))
      .executeTakeFirst();

    const notificationId = Number(insertion.insertId);
    return await this.getNotification(notificationId);
  },

  getNotification(notificationId: number) {
    return db
      .selectFrom('notification')
      .select(['recipient_id', 'message', 'created_at', 'redirect_to'])
      .where('id', '=', notificationId)
      .executeTakeFirst();
  },

  getNotifications(userId: number, page: number) {
    return db
      .selectFrom('notification')
      .select(['recipient_id', 'message', 'created_at', 'redirect_to'])
      .where('recipient_id', '=', userId)
      .orderBy('read_at', 'asc')
      .orderBy('created_at', 'desc')
      .limit(15)
      .offset(page * 15 - 15)
      .execute();
  },
};
