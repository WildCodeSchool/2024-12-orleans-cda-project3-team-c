import type { UserFollowees, UserFollowers } from '@app/api';

import ApiConnection from './api-connection';

type UserFollowersRessource = {
  followers: UserFollowers[];
  followees: UserFollowees[];
};

type Follows = {
  data: UserFollowersRessource | null;
  error: string;
  message?: string;
};

class UserFollowersApi extends ApiConnection {
  constructor(ressource = 'follows') {
    super(ressource);
  }

  async getUserFollowers(followerId: number): Promise<Follows> {
    try {
      const response = await fetch(`${this.ressourceUrl}/${followerId}`);

      if (response.ok) {
        const followsData: UserFollowersRessource = await response.json();

        return {
          data: followsData,
          error: '',
        };
      } else {
        console.error('Failed to get followers:', response.statusText);
        return {
          message: 'Failed to get followers',
          data: null,
          error: response.statusText,
        };
      }
    } catch (error) {
      console.error('Error getting followers:', error);
      return {
        data: null,
        error: String(error),
        message: 'Exception occurred',
      };
    }
  }
}

export default new UserFollowersApi();
