import { db } from '@app/backend-shared';

import type { PostTagInsertionList } from './model-types';

export default {
  create(tagId: number, postId: number) {
    return db
      .insertInto('post_tag')
      .values({ tag_id: tagId, post_id: postId })
      .executeTakeFirst();
  },

  createMany(postTagInsertionList: PostTagInsertionList[]) {
    return db.insertInto('post_tag').values(postTagInsertionList).execute();
  },
};
