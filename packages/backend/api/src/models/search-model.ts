import { db } from '@app/backend-shared';

export default {
  async getUsersInfoBySearch(search: string, limit: number) {
    return db
      .selectFrom('user')
      .innerJoin(
        'account_status',
        'account_status.id',
        'user.account_status_id',
      )
      .select([
        'user.id',
        'user.username',
        'user.profile_picture',
        'account_status.name as status',
      ])
      .where('user.username', 'like', `%${search}%`)
      .limit(limit)
      .execute();
  },

  async getPostsInfoInTagBySearch(search: string, limit: number) {
    return db
      .selectFrom('tag')
      .innerJoin('post_tag', 'post_tag.tag_id', 'tag.id')
      .innerJoin('post', 'post.id', 'post_tag.post_id')
      .select(['post.id', 'post.description', 'post.picture'])
      .where('tag.name', 'like', `%${search}%`)
      .limit(limit)
      .execute();
  },
};
