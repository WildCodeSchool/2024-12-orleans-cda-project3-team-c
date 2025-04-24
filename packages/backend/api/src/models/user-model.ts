import argon2 from 'argon2';

import { db } from '@app/backend-shared';

export async function userLogin(email: string) {
  return db
    .selectFrom('user')
    .select(['user.id', 'user.password', 'user.email'])
    .where('user.email', '=', email || 'user.username ')
    .executeTakeFirst();
}

export async function userRegister(
  email: string,
  username: string,
  password: string,
) {
  try {
    // Pour la verif du mail
    const existingEmail = await db
      .selectFrom('user')
      .select('email')
      .where('email', '=', email)
      .executeTakeFirst();

    if (existingEmail) {
      return { error: 'Email is already in use, please use a different email' };
    }

    // Pour la verif du username
    const existingUsername = await db
      .selectFrom('user')
      .select('username')
      .where('username', '=', username)
      .executeTakeFirst();

    if (existingUsername) {
      return {
        error: 'Email is already in use, please use a different username',
      };
    }

    // Hachage du mot de passe
    const hashPassword = await argon2.hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      parallelism: 1,
    });

    // Insert de l'utilisateur dans la base de données
    await db
      .insertInto('user')
      .values({ email, username, password: hashPassword })
      .executeTakeFirst();

    return { message: 'User created successfully' };
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Failed to create user',
    );
  }
}

export async function getUserById(userId: number) {
  return db
    .selectFrom('user')
    .selectAll()
    .where('user.id', '=', userId)
    .executeTakeFirst();
}
