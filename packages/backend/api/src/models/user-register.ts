import argon2 from 'argon2';

import { db } from '@app/backend-shared';

export async function userRegister(
  email: string,
  username: string,
  password: string,
) {
  const hashPassword = await argon2.hash(password, {
    memoryCost: 19456,
    timeCost: 2,
    parallelism: 1,
  });

  return db
    .insertInto('user')
    .values({ email, username, password: hashPassword })
    .executeTakeFirst()
    .then(() => ({ message: 'User created successfully' }))
    .catch((error: unknown) => {
      // eslint-disable-next-line no-console
      console.error('Error creating user:', error);
      throw new Error('Failed to create user');
    });
}
