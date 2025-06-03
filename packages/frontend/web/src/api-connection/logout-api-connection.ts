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
        return { ok: false };
      }

      return (await response.json()) as { ok: boolean };
    } catch (error) {
      console.error('Error during logout', error);
      return { ok: false };
    }
  }
}

export default new LoginApiConnection();
