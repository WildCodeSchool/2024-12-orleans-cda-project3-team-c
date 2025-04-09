import argon2 from 'argon2';

import { db } from '@app/backend-shared';

export async function userLogin(email: string, password: string) {
  try {
    const user = await db
      .selectFrom('user')
      .selectAll()
      .where('user.email', '=', email || 'user.username')
      .executeTakeFirst();

    if (!user) {
      return { error: 'Invalid email or password' };
    }

    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) {
      return { error: 'Invalid email or password' };
    }

    return { message: 'Login successful' };
  } catch (error) {
    console.error('Error logging in:', error);
    throw new Error('Internal server error');
  }
}
