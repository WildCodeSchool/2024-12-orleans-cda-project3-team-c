import argon2 from 'argon2';
import { jsonArrayFrom } from 'kysely/helpers/mysql';

import { db } from '@app/backend-shared';

export async function userLogin(email: string) {
  return db
    .selectFrom('user')
    .select(['user.id', 'user.password', 'user.email'])
    .where('user.email', '=', email)
    .executeTakeFirst();
}

export async function userRegister(
  email: string,
  username: string,
  password: string,
) {
  try {
    // Pour la verif du mail
    const alreadyExists = await db
      .selectFrom('user')
      .select(['email', 'username'])
      .where((eb) =>
        eb.or([eb('email', '=', email), eb('username', '=', username)]),
      )
      .executeTakeFirst();

    if (alreadyExists) {
      if (alreadyExists.email === email) {
        return {
          error: 'Email is already in use, please use a different email',
          ok: false,
        };
      }
      return {
        error: 'username is already in use, please use a different username',
        ok: false,
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

    return { message: 'User created successfully', ok: true };
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

export default {
  async getUserProfileById(userId: number) {
    const profile = await db
      .selectFrom('user')
      .select((eb) => [
        'user.id',
        'user.username',
        'user.profile_picture',
        'user.biography',
        'user.notoriety',
        eb
          .selectFrom('follow_up')
          .select(({ fn }) => fn.countAll<number>().as('followersCount'))
          .where('follow_up.followee_id', '=', userId)
          .as('followersCount'),
        eb
          .selectFrom('follow_up')
          .select(({ fn }) => fn.countAll<number>().as('followingCount'))
          .where('follow_up.follower_id', '=', userId)
          .as('followingCount'),
        jsonArrayFrom(
          eb
            .selectFrom('post')
            .leftJoin('post_like', 'post_like.post_id', 'post.id')
            .leftJoin('comment', 'comment.post_id', 'post.id')
            .select((eb2) => [
              'post.id',
              'post.picture',
              eb2.fn.count<number>('post_like.user_id').as('likeCount'),
              eb2.fn.count<number>('comment.id').as('commentCount'),
            ])
            .where('post.user_id', '=', userId)
            .groupBy('post.id')
            .orderBy('post.created_at', 'desc')
            .limit(8),
        ).as('posts'),
      ])
      .where('user.id', '=', userId)
      .executeTakeFirst();

    if (!profile) {
      return null;
    }

    return {
      ...profile,
      followersCount: profile.followersCount ?? 0,
      followingCount: profile.followingCount ?? 0,
    };
  },
};
