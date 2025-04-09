import { db } from '@app/backend-shared';

// export function userCookie(email: number) {
//   try {
//     const userCookie = db
//       .selectFrom('user')
//       .select(['user.id', 'user.email'])
//       .where('user.id', '=', email);
//   } catch (error) {
//     console.error('error getting cookie', error);
//     throw new Error('Internal server error');
//   }
// }

export default {
  userCookie(userId: number) {
    return db
      .selectFrom('user')
      .select(['user.id', 'user.email'])
      .where('user.id', '=', 1)
      .executeTakeFirstOrThrow();
  },
};
