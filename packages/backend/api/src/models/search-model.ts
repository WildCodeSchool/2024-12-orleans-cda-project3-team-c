import { db } from '@app/backend-shared';

export async function getUsersInfoBySearch(search: string, limit: number) {
  return db
    .selectFrom('user')
    .select(['user.id', 'user.username', 'user.profile_picture'])
    .where('user.username', 'like', `%${search}%`)
    .limit(limit)
    .execute();
}

export async function getPostsInfoInTagBySearch(search: string, limit: number) {
  return db
    .selectFrom('tag')
    .innerJoin('post_tag', 'post_tag.tag_id', 'tag.id')
    .innerJoin('post', 'post.id', 'post_tag.tag_id')
    .select(['post.id', 'post.description', 'post.picture'])
    .where('tag.name', 'like', `%${search}%`)
    .limit(limit)
    .execute();
}
