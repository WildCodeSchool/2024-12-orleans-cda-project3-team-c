import { db } from '@app/backend-shared';

async function getFollowersCount(userId: number): Promise<number> {
  const result = await db
    .selectFrom('follow_up as f')
    .innerJoin('user as u', 'u.id', 'f.follower_id')
    .select((eb) => eb.fn.countAll<number>().as('count'))
    .where('f.followee_id', '=', userId)
    .executeTakeFirst();

  return result?.count ?? 0;
}

async function getFollowingCount(userId: number): Promise<number> {
  const result = await db
    .selectFrom('follow_up as f')
    .innerJoin('user as u', 'u.id', 'f.follower_id')
    .select((eb) => eb.fn.countAll<number>().as('count'))
    .where('f.followee_id', '=', userId)
    .executeTakeFirst();

  return result?.count ?? 0;
}

export default {
  getFollowersCount,
  getFollowingCount,
};
