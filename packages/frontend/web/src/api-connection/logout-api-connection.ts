import ApiConnection from './api-connection';

class LoginApiConnection extends ApiConnection {
  constructor(ressource = 'auth/logout') {
    super(ressource);
  }

  async logout() {
    try {
      const response = await fetch(this.ressourceUrl, {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        console.error('Error during logout');
      }

      return (await response.json()) as { ok: boolean };
    } catch (error) {
      console.error('Error during logout', error);
    }
  }
}

export default new LoginApiConnection();
