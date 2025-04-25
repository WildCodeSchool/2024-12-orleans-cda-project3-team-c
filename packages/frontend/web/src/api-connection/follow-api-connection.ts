import type { FollowAction } from '@app/api';

import ApiConnection from './api-connection';

class FollowApiConnection extends ApiConnection {
  constructor(resource = 'follow') {
    super(resource);
  }

  async followUser(followeeId: number): Promise<FollowAction | null> {
    try {
      const response = await fetch(`${this.ressourceUrl}/follow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ followeeId }),
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

  async unfollowUser(followeeId: number): Promise<FollowAction | null> {
    try {
      const response = await fetch(`${this.ressourceUrl}/unfollow`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ followeeId }),
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
}

const followApiConnection = new FollowApiConnection();
export default followApiConnection;

export type FollowApiConnectionInstance = typeof followApiConnection;
