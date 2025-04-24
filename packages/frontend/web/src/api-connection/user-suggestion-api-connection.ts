import ApiConnection from './api-connection';

type UserWithFollowersResponse = {
  id: number;
  username: string;
  profile_picture: string;
  followers_count: number;
};

class UserApiConnection extends ApiConnection {
  constructor(ressource = 'users') {
    super(ressource);
  }

  async getUserWithFollowersById(
    userId: number,
  ): Promise<UserWithFollowersResponse | null> {
    try {
      const response = await fetch(`${this.ressourceUrl}/${userId}`);
      if (response.ok) {
        const userData: UserWithFollowersResponse = await response.json();
        return userData;
      } else {
        console.error('Failed to get user:', response.statusText);
        return null;
      }
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  }

  async getUsersWithFollowers(): Promise<UserWithFollowersResponse[]> {
    try {
      const response = await fetch(`${this.ressourceUrl}/user-suggestion`);
      if (response.ok) {
        const usersData: UserWithFollowersResponse[] = await response.json();
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
