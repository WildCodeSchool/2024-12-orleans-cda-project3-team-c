import { db } from '@app/backend-shared';

export async function getUsersInfoBySearch(search: string) {
  return db
    .selectFrom('user')
    .select(['user.id', 'user.username', 'user.profile_picture'])
    .where('user.username', 'like', `%${search}%`)
    .execute();
}

export async function getPostsInfoBySearch(search: string) {
  return db
    .selectFrom('post')
    .select(['post.id', 'post.description', 'post.picture'])
    .where('post.description', 'like', `%${search}%`)
    .execute();
}
