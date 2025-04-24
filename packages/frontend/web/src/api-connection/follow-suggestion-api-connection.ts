import type { FollowAction, FollowCheckStatus, FollowersCount } from '@app/api';

import ApiConnection from './api-connection';

class FollowApiConnection extends ApiConnection {
  constructor(resource = 'follow') {
    super(resource);
  }

  async checkFollowStatus(
    followerId: number,
    followeeId: number,
  ): Promise<FollowCheckStatus | null> {
    try {
      const response = await fetch(
        `${this.ressourceUrl}/check?followerId=${followerId}&followeeId=${followeeId}`,
      );
      if (response.ok) {
        return (await response.json()) as FollowCheckStatus;
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
  ): Promise<FollowAction | null> {
    try {
      const response = await fetch(`${this.ressourceUrl}/follow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ followerId, followeeId }),
      });

      if (response.ok) {
        return (await response.json()) as FollowAction;
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
  ): Promise<FollowAction | null> {
    try {
      const response = await fetch(`${this.ressourceUrl}/unfollow`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ followerId, followeeId }),
      });

      if (response.ok) {
        return (await response.json()) as FollowAction;
      } else {
        console.error('Failed to unfollow user:', response.statusText);
        return null;
      }
    } catch (error) {
      console.error('Error unfollowing user:', error);
      return null;
    }
  }

  async getFollowersSuggestionCount(
    userId: number,
  ): Promise<FollowersCount | null> {
    try {
      const response = await fetch(
        `${this.ressourceUrl}/followers-count/${userId}`,
      );
      if (response.ok) {
        const data: FollowersCount = await response.json();
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
    const response = await this.getFollowersSuggestionCount(userId);
    return response?.followers_count ?? 0;
  }
}

const followApiConnection = new FollowApiConnection();
export default followApiConnection;

export type FollowApiConnectionInstance = typeof followApiConnection;
