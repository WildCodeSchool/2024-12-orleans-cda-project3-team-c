import { brotliDecompressSync } from 'node:zlib';

import type { FeedPost } from '@app/api';

import ApiConnection from './api-connection';

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
    }
    return [];
  }

  async create(body: FormData) {
    try {
      const response = await fetch(this.ressourceUrl, {
        method: 'POST',
        body: body,
      });

      if (response.ok) {
        return true;
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export default new PostApiConnection();
