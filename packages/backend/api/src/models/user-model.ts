import { db } from '@app/backend-shared';

export default {
  async getUserById(userId: number) {
    return await db
      .selectFrom('user')
      .select(['id', 'username', 'profile_picture', 'email', 'biography'])
      .where('id', '=', userId)
      .executeTakeFirst();
  },

  async getUserByPicture(userId: number, userPicture: string) {
    return await db
      .selectFrom('user')
      .select(['id', 'profile_picture'])
      .where('id', '=', userId)
      .where('profile_picture', '=', userPicture)
      .executeTakeFirst();
  },

  async getUserByUsernameOrId(parameter: string) {
    const isNumericId = /^\d+$/.test(parameter);

    return await db
      .selectFrom('user')
      .select(['id', 'username', 'profile_picture', 'email', 'biography'])
      .where((eb) =>
        isNumericId
          ? eb('id', '=', Number(parameter))
          : eb('username', '=', parameter),
      )
      .executeTakeFirst();
  },
};
