import { db } from '@app/backend-shared';

export default {
  async create(tagId: number, postId: number) {
    return db
      .insertInto('post_tag')
      .values({ tag_id: tagId, post_id: postId })
      .executeTakeFirst();
  },
};
