import { db } from '@app/backend-shared';

export default {
  getDiscussionIdsByUser(userId: number) {
    return db
      .selectFrom('discussion_participant')
      .select(['discussion_id'])
      .where('discussion_participant.user_id', '=', userId)
      .execute();
  },
};
