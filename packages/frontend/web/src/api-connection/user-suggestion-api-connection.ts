import type { UserSuggestion } from '@app/api';

import ApiConnection from './api-connection';

class UserApiConnection extends ApiConnection {
  constructor(ressource = 'suggestion') {
    super(ressource);
  }

  async getUserSuggestions(): Promise<UserSuggestion[]> {
    try {
      const response = await fetch(`${this.ressourceUrl}/users`);

      if (response.ok) {
        const usersData: UserSuggestion[] = await response.json();
        return usersData;
      } else {
        console.error('Failed to get users:', response.statusText);
        return [];
      }
    } catch (error) {
      console.error('Error getting users:', error);
      return [];
    }
  }
}

export default new UserApiConnection();
