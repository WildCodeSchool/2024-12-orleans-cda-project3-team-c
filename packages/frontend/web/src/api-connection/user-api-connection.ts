// src/api-connection/user-api-connection.ts
import ApiConnection from './api-connection';

export type UserPost = {
  id: number;
  picture: string;
  description: string;
  created_at: string;
  likeCount: number;
  commentCount: number;
};

export type UserProfile = {
  id: number;
  username: string;
  profile_picture: string;
  biography: string;
  notoriety: number;
  posts: UserPost[];
};

class UserApiConnection extends ApiConnection {
  constructor(ressource = 'users') {
    super(ressource);
  }

  async getProfile(): Promise<UserProfile> {
    const res = await fetch(`${this.ressourceUrl}/profile`);

    if (!res.ok) throw new Error('Failed to load profile');

    const data = await res.json();
    return data as UserProfile;
  }
}

export default new UserApiConnection();
