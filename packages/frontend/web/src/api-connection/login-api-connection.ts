import type { User } from '@/contexts/auth-context';

import ApiConnection from './api-connection';

type LoginApiConnectionInterface = {
  user: User;
  message: string;
  ok: boolean;
};
class LoginApiConnection extends ApiConnection {
  constructor(resource = 'auth/login') {
    super(resource);
  }

  async login(
    email: string,
    password: string,
  ): Promise<LoginApiConnectionInterface> {
    try {
      const response = await fetch(this.ressourceUrl, {
        headers: { 'Content-type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      return (await response.json()) as LoginApiConnectionInterface;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }
}

export default new LoginApiConnection();
