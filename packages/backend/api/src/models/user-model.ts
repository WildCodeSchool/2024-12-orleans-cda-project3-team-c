import argon2 from 'argon2';
import { sql } from 'kysely';
import { jsonArrayFrom } from 'kysely/helpers/mysql';

import { db } from '@app/backend-shared';

export default {
  userProfilRequest(userId: number) {
    return db
      .selectFrom('user as u')
      .innerJoin('account_status', 'account_status.id', 'u.account_status_id')
      .select((eb) => [
        'u.id',
        'u.username',
        'u.profile_picture',
        'u.biography',
        'u.notoriety',
        'account_status.name as status',
        eb
          .selectFrom('follow_up')
          .select(({ fn }) => fn.countAll<number>().as('followersCount'))
          .whereRef('follow_up.followee_id', '=', 'u.id')
          .as('followersCount'),
        eb
          .selectFrom('follow_up')
          .select(({ fn }) => fn.countAll<number>().as('followingCount'))
          .whereRef('follow_up.follower_id', '=', 'u.id')
          .as('followingCount'),
        jsonArrayFrom(
          eb
            .selectFrom('post')
            .select(['post.id', 'post.picture'])
            .whereRef('post.user_id', '=', 'u.id')
            .groupBy('post.id')
            .orderBy('post.created_at', 'desc')
            .limit(8),
        ).as('posts'),
        eb
          .selectFrom('post')
          .select((eb) => [eb.fn.count<number>('post.id').as('postCount')])
          .whereRef('post.user_id', '=', 'u.id')
          .as('postCount'),
        eb
          .selectFrom('post_like')
          .innerJoin('post', 'post.id', 'post_like.post_id')
          .innerJoin('user', 'user.id', 'post.user_id')
          .select((eb) => [
            eb.fn.count<number>('post_like.post_id').as('likeCount'),
          ])
          .whereRef('post.user_id', '=', 'u.id')
          .as('likeCount'),
        eb
          .selectFrom('follow_up')
          .select('follow_up.created_at as isFollowing')
          .where('follow_up.follower_id', '=', userId)
          .whereRef('follow_up.followee_id', '=', 'u.id')
          .as('isFollowing'),
      ]);
  },

  async getUserProfileById(userId: number, authenticatedUser: number) {
    const profile = await this.userProfilRequest(authenticatedUser)
      .where('u.id', '=', userId)
      .executeTakeFirst();

    return profile
      ? {
          ...profile,
          followersCount: profile.followersCount ?? 0,
          followingCount: profile.followingCount ?? 0,
        }
      : null;
  },

  async getUserProfileByUsername(username: string, authenticatedUser: number) {
    const profile = await this.userProfilRequest(authenticatedUser)
      .where('u.username', '=', username)
      .executeTakeFirst();

    return profile
      ? {
          ...profile,
          followersCount: profile.followersCount ?? 0,
          followingCount: profile.followingCount ?? 0,
        }
      : null;
  },

  async updateUserProfile(
    userId: number,
    updates: {
      username?: string;
      biography?: string;
      profile_picture?: string;
    },
  ) {
    await db
      .updateTable('user')
      .set(updates)
      .where('id', '=', userId)
      .execute();
  },

  async getUserSuggestionsForUser(userId: number) {
    return await db
      .with('usersYouDontFollow', (eb) =>
        eb
          .selectFrom('user as u')
          .leftJoin('follow_up as fu', 'fu.follower_id', 'u.id')
          .innerJoin(
            'account_status',
            'account_status.id',
            'u.account_status_id',
          )
          .where('u.id', '!=', userId)
          .where('u.id', 'not in', (eb) =>
            eb
              .selectFrom('follow_up as fu')
              .select('fu.followee_id')
              .where('fu.follower_id', '=', userId),
          )
          .orderBy(sql`RAND()`)
          .limit(5)
          .select([
            'u.id',
            'u.username',
            'u.profile_picture',
            'account_status.name as status',
            eb
              .selectFrom('follow_up')
              .select(({ fn }) => fn.countAll<number>().as('follower_count'))
              .whereRef('follow_up.followee_id', '=', sql.ref('u.id'))
              .as('follower_count'),
          ]),
      )
      .with('usersYouFollow', (eb) =>
        eb
          .selectFrom('user as u')
          .innerJoin(
            'account_status',
            'account_status.id',
            'u.account_status_id',
          )
          .where('u.id', '!=', userId)
          .where('u.id', 'in', (eb) =>
            eb
              .selectFrom('follow_up as fu')
              .select('fu.followee_id')
              .where('fu.follower_id', '=', userId),
          )
          .select([
            'u.id',
            'u.username',
            'u.profile_picture',
            'account_status.name as status',
            eb
              .selectFrom('follow_up')
              .select(({ fn }) => fn.countAll<number>().as('follower_count'))
              .whereRef('follow_up.followee_id', '=', sql.ref('u.id'))
              .as('follower_count'),
          ]),
      )
      .with('followeesOfUsersYouFollow', (eb) =>
        eb
          .selectFrom('user as u')
          .innerJoin(
            'account_status',
            'account_status.id',
            'u.account_status_id',
          )
          .where('u.id', '!=', userId)
          .where('u.id', 'in', (eb) =>
            eb
              .selectFrom('follow_up as fu')
              .select('fu.followee_id')
              .where('fu.follower_id', 'in', (eb) =>
                eb.selectFrom('usersYouFollow as uyf').select('uyf.id'),
              ),
          )
          .orderBy(sql`RAND()`)
          .select([
            'u.id',
            'u.username',
            'u.profile_picture',
            'account_status.name as status',
            eb
              .selectFrom('follow_up')
              .select(({ fn }) => fn.countAll<number>().as('follower_count'))
              .whereRef('follow_up.followee_id', '=', sql.ref('u.id'))
              .as('follower_count'),
          ]),
      )
      .selectFrom((eb) =>
        eb
          .selectFrom('followeesOfUsersYouFollow')
          .selectAll()
          .union(eb.selectFrom('usersYouDontFollow').selectAll())
          .as('uydf'),
      )
      .where('uydf.id', 'not in', (eb) =>
        eb
          .selectFrom('follow_up as fu')
          .select('fu.followee_id')
          .where('fu.follower_id', '=', userId),
      )
      .selectAll()
      .limit(5)
      .execute();
  },

  async userLogin(credential: string) {
    return db
      .selectFrom('user')
      .select([
        'user.id',
        'user.password',
        'user.email',
        'user.profile_picture',
      ])
      .where((eb) =>
        eb.or([eb('email', '=', credential), eb('username', '=', credential)]),
      )
      .executeTakeFirst();
  },

  async userRegister(email: string, username: string, password: string) {
    try {
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

      return true;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error(
        error instanceof Error ? error.message : 'Failed to create user',
      );
    }
  },

  async checkIfCredentialsAlreadyExists(email: string, username: string) {
    const messages: { email?: string; username?: string } = {};

    const results = await db
      .selectFrom('user')
      .select(['email', 'username'])
      .where((eb) =>
        eb.or([eb('email', '=', email), eb('username', '=', username)]),
      )
      .execute();

    if (results.length) {
      results.forEach((result) => {
        if (result.email === email) {
          messages.email = 'This email address is already in use';
        }
        if (result.username === username) {
          messages.username = 'This username is not available';
        }
      });
      return messages;
    }
    return false;
  },

  async getLoggedInUser(userId: number) {
    return db
      .selectFrom('user')
      .select(['id', 'profile_picture'])
      .where('user.id', '=', userId)
      .executeTakeFirst();
  },

  async getUserProfilePicture(userId: number) {
    return db
      .selectFrom('user')
      .select('profile_picture')
      .where('id', '=', userId)
      .executeTakeFirst();
  },
};
