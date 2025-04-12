import type { FeedPost } from '@app/api';

import ApiConnection from './api-connection';

type PostCountResponse = {
  count: number;
};

class PostApiConnection extends ApiConnection {
  constructor(ressource = 'posts') {
    super(ressource);
  }

  async getPage(page = 1): Promise<FeedPost[]> {
    try {
      const response = await fetch(`${this.ressourceUrl}?page=${page}`);
      if (response.ok) {
        return (await response.json()) as FeedPost[];
      } else {
        throw new Error('Error while fetching feed page');
      }
    } catch (error) {
      console.error(error);
      return []; // Retourne un tableau vide en cas d'erreur
    }
  }

  async getOwnCountPost(): Promise<number> {
    try {
      const response = await fetch(`${this.ressourceUrl}/count`);
      if (response.ok) {
        const data: PostCountResponse = await response.json();
        return data.count ?? 0;
      } else {
        throw new Error('Error fetching post count');
      }
    } catch (error) {
      console.error(error);
      return 0;
    }
  }

  async getFollowersCount(userId: number): Promise<number> {
    const response = await fetch(`/follows/${userId}/followers`);
    const data: { count: number } = await response.json();
    return data.count ?? 0;
  }

  async getFollowingCount(userId: number): Promise<number> {
    const response = await fetch(`/follows/${userId}/following`);
    const data: { count: number } = await response.json();
    return data.count ?? 0;
  }
}

export default new PostApiConnection();
