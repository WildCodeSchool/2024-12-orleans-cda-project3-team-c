import { db } from '@app/backend-shared';

export default {
  async getUserById(userId: number) {
    const result = await db
      .selectFrom('user')
      .select(['id', 'username', 'profile_picture'])
      .where('id', '=', userId)
      .executeTakeFirst();

    return result;
  },
};
