import type { FeedPost, PostPreview, UserProfile } from '@app/api';

import ApiConnection from './api-connection';

class UserApiConnection extends ApiConnection {
  constructor(ressource = 'users') {
    super(ressource);
  }

  async getProfile(): Promise<UserProfile> {
    const res = await fetch(`${this.ressourceUrl}/profile`);

    if (!res.ok) {
      throw new Error('Failed to fetch profile');
    }

    const data = (await res.json()) as UserProfile;
    return data;
  }

  async updateProfilePicture(file: File) {
    const formData = new FormData();
    formData.append('picture', file);
    const response = await fetch(`${this.ressourceUrl}/profile-picture`, {
      method: 'PUT',
      body: formData,
    });

    if (response.ok) {
      const data = (await response.json()) as {
        message: string;
        filename: string;
      };
      return data;
    }
    throw new Error('Failed to upload profile picture');
  }

  async updateUsername(username: string): Promise<void> {
    const res = await fetch(`${this.ressourceUrl}/username`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });

    if (!res.ok) throw new Error('Failed to update username');
  }

  async updateBiography(biography: string): Promise<void> {
    const res = await fetch(`${this.ressourceUrl}/biography`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ biography }),
    });

    if (!res.ok) throw new Error('Failed to update biography');
  }

  async getProfileByUsername(username: string): Promise<UserProfile> {
    const res = await fetch(`${this.ressourceUrl}/profile/${username}`);

    if (!res.ok) {
      throw new Error('Failed to fetch profile by username');
    }

    const data = (await res.json()) as UserProfile;
    return data;
  }

  async getUserFeedPage(username: string, page: number): Promise<FeedPost[]> {
    try {
      const response = await fetch(
        `${this.ressourceUrl}/${username}/posts?page=${page}`,
      );

      if (response.ok) {
        return (await response.json()) as FeedPost[];
      } else {
        throw new Error('Error while fetching user posts');
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async getUserPreviewsPage(userId: number, page: number) {
    try {
      const response = await fetch(
        `${this.ressourceUrl}/${userId}/previews?page=${page}`,
      );

      if (response.ok) {
        return (await response.json()) as PostPreview[];
      } else {
        throw new Error('Error while fetching user post previews');
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

export default new UserApiConnection();
