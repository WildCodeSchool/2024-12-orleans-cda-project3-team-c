import ApiConnection from './api-connection';

class RegisterApiConnection extends ApiConnection {
  constructor(ressource = 'auth/register') {
    super(ressource);
  }

  async register(email: string, username: string, password: string) {
    try {
      const response = await fetch(this.ressourceUrl, {
        headers: { 'Content-type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({ email, username, password }),
      });

      const result: {
        email?: string;
        username?: string;
        password?: string;
        ok?: boolean;
      } = await response.json();

      return result;
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    }
  }
}

export default new RegisterApiConnection();
