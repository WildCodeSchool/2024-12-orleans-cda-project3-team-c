import { db } from '@app/backend-shared';

export default {
  async getUserById(userId: number) {
    return await db
      .selectFrom('user')
      .select([
        'id',
        'username',
        'profile_picture',
        'email',
        'biography',
        'notoriety',
      ])
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
      .select([
        'id',
        'username',
        'profile_picture',
        'email',
        'biography',
        'notoriety',
      ])
      .where((eb) =>
        isNumericId
          ? eb('id', '=', Number(parameter))
          : eb('username', '=', parameter),
      )
      .executeTakeFirst();
  },

  async updateProfilePicture(userId: number, newPicture: string) {
    await db
      .updateTable('user')
      .set({ profile_picture: newPicture })
      .where('id', '=', userId)
      .executeTakeFirst();
  },

  async updateUsername(userId: number, username: string) {
    await db
      .updateTable('user')
      .set({ username })
      .where('id', '=', userId)
      .execute();
  },

  async updateBiography(userId: number, biography: string) {
    await db
      .updateTable('user')
      .set({ biography })
      .where('id', '=', userId)
      .execute();
  },
};
