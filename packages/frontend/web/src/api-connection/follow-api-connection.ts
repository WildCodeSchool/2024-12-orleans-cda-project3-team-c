import type { Follow } from '@app/api';

import ApiConnection from './api-connection';

// Définir un type pour la réponse de getFollowersCount
type FollowersCountResponse = {
  followers_count: number;
};

class FollowApiConnection extends ApiConnection {
  constructor(resource = 'follow') {
    super(resource);
  }

  async checkFollowStatus(
    followerId: number,
    followeeId: number,
  ): Promise<Follow | null> {
    try {
      const response = await fetch(
        `${this.ressourceUrl}/check?followerId=${followerId}&followeeId=${followeeId}`,
      );
      if (response.ok) {
        return (await response.json()) as Follow;
      } else {
        console.error('Failed to check follow status:', response.statusText);
        return null;
      }
    } catch (error) {
      console.error('Error checking follow status:', error);
      return null;
    }
  }

  async followUser(
    followerId: number,
    followeeId: number,
  ): Promise<Follow | null> {
    try {
      const response = await fetch(`${this.ressourceUrl}/follow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ followerId, followeeId }),
      });

      if (response.ok) {
        return (await response.json()) as Follow;
      } else {
        console.error('Failed to follow user:', response.statusText);
        return null;
      }
    } catch (error) {
      console.error('Error following user:', error);
      return null;
    }
  }

  async unfollowUser(
    followerId: number,
    followeeId: number,
  ): Promise<Follow | null> {
    try {
      const response = await fetch(`${this.ressourceUrl}/unfollow`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ followerId, followeeId }),
      });

      if (response.ok) {
        return (await response.json()) as Follow;
      } else {
        console.error('Failed to unfollow user:', response.statusText);
        return null;
      }
    } catch (error) {
      console.error('Error unfollowing user:', error);
      return null;
    }
  }

  async getFollowersCount(
    userId: number,
  ): Promise<FollowersCountResponse | null> {
    try {
      const response = await fetch(
        `${this.ressourceUrl}/followers-count/${userId}`,
      );
      if (response.ok) {
        const data: FollowersCountResponse = await response.json();
        return data;
      } else {
        console.error('Failed to fetch followers count:', response.statusText);
        return null;
      }
    } catch (error) {
      console.error('Error fetching followers count:', error);
      return null;
    }
  }

  async fetchFollowersCount(userId: number): Promise<number> {
    const response = await this.getFollowersCount(userId);
    return response?.followers_count ?? 0;
  }
}

// Exporter une instance typée
const followApiConnection = new FollowApiConnection();
export default followApiConnection;

// Définir le type pour l'instance exportée
export type FollowApiConnectionInstance = typeof followApiConnection;
