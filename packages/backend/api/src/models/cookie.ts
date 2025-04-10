import { db } from '@app/backend-shared';

export default {
  userCookie() {
    return db
      .selectFrom('user')
      .select(['user.id', 'user.email'])
      .where('user.id', '=', 1)
      .executeTakeFirstOrThrow();
  },
};
