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
  followersCount: number;
  followingCount: number;
};

class UserApiConnection extends ApiConnection {
  constructor(ressource = 'users') {
    super(ressource);
  }

  async getProfile(): Promise<UserProfile> {
    console.log('[user-api-connection] getProfile()');
    const res = await fetch(`${this.ressourceUrl}/profile`);

    if (!res.ok) {
      console.error('[user-api-connection] Erreur HTTP:', res.status);
      throw new Error('Failed to fetch profile');
    }

    const data = (await res.json()) as UserProfile;
    console.log('[user-api-connection] Données reçues:', data);
    return data;
  }

  async updateProfilePicture(file: File): Promise<void> {
    const formData = new FormData();
    formData.append('picture', file);

    const res = await fetch(`${this.ressourceUrl}/profile`, {
      method: 'PATCH',
      body: formData,
    });

    if (!res.ok) {
      console.error('[user-api-connection] Erreur HTTP:', res.status);
      throw new Error('Failed to update profile picture');
    }
  }
}

export default new UserApiConnection();
