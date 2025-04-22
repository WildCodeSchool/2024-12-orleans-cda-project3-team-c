import ApiConnection from './api-connection';

class RegisterApiConnection extends ApiConnection {
  constructor(ressource = 'register') {
    super(ressource);
  }

  async register(
    email: string,
    username: string,
    password: string,
  ): Promise<unknown> {
    try {
      const response = await fetch(this.ressourceUrl, {
        headers: { 'Content-type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({ email, username, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to register');
      }

      return await response.json();
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    }
  }
}

export default new RegisterApiConnection();
