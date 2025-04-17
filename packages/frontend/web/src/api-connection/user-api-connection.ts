import type { FeedPost } from '@app/api';

import ApiConnection from './api-connection';

class UserApiConnection extends ApiConnection {
  constructor(ressource = 'feed') {
    super(ressource);
  }

  async userConnection(email: string, password: string) {
    try {
      const response = await fetch(`${this.ressourceUrl}/cookie`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET',
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        return (await response.json()) as FeedPost[];
      } else {
        throw new Error('user connection failed');
      }
    } catch (error) {
      console.error(error);
    }
    return [];
  }
}

export default new UserApiConnection();
