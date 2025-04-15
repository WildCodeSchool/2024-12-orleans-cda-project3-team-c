import ApiConnection from './api-connection';

type FollowersCountResponse = {
  followers_count: number;
};

class FollowCountApiConnection extends ApiConnection {
  constructor(ressource = 'follow') {
    super(ressource);
  }

  async fetchFollowersCount(userId: number): Promise<number | null> {
    try {
      const response = await fetch(
        `${this.ressourceUrl}/followers-count/${userId}`,
      );
      if (response.ok) {
        const data: FollowersCountResponse = await response.json();
        return data.followers_count;
      } else {
        console.error('Failed to fetch followers count:', response.statusText);
        return null;
      }
    } catch (error) {
      console.error('Error fetching followers count:', error);
      return null;
    }
  }
}

export default new FollowCountApiConnection();
