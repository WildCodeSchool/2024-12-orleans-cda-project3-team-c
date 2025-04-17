import { db } from '@app/backend-shared';

export default async function userCookie(userId: number) {
  try {
    return await db
      .selectFrom('user')
      .select(['user.id', 'user.email'])
      .where('user.id', '=', userId)
      .executeTakeFirstOrThrow();
  } catch (error) {
    console.error('Error in userCookie:', error);
    throw new Error('Failed to fetch user from database');
  }
}
