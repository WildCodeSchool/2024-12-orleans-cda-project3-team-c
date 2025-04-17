import argon2 from 'argon2';

import { db } from '@app/backend-shared';

export async function userLogin(email: string, password: string) {
  try {
    const user = await db
      .selectFrom('user')
      .select(['user.id', 'user.password', 'user.email'])
      .where('user.email', '=', email || 'user.username ')
      .executeTakeFirst();

    if (!user) {
      return { error: 'Invalid email or password' };
    }

    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) {
      return { error: 'Invalid email or password' };
    }

    return {
      message: 'Login successful',
      userId: user.id,
      email: user.email,
    };
  } catch (error) {
    console.error('Error logging in:', error);
    throw new Error('Internal server error');
  }
}
