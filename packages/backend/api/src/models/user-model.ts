import { sql } from 'kysely';

import { db } from '@app/backend-shared';

export default {
  // Récupérer un utilisateur par ID
  async getUserById(userId: number) {
    return await db
      .selectFrom('user')
      .select([
        'id',
        'username',
        'profile_picture',
        'email',
        sql<string>`biography`.as('bio'), // alias avec `sql`
      ])
      .where('id', '=', userId)
      .executeTakeFirst();
  },

  // Récupérer un utilisateur par ID ou username
  async getUserByUsernameOrId(parameter: string) {
    const isNumericId = /^\d+$/.test(parameter);

    return await db
      .selectFrom('user')
      .select([
        'id',
        'username',
        'profile_picture',
        'email',
        sql<string>`biography`.as('bio'),
      ])
      .where((eb) =>
        isNumericId
          ? eb('id', '=', Number(parameter))
          : eb('username', '=', parameter),
      )
      .executeTakeFirst();
  },
};
