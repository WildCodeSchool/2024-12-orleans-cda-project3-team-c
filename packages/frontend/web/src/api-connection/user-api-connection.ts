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
    const res = await fetch(`${this.ressourceUrl}/profile`);

    if (!res.ok) throw new Error('Failed to load profile');

    const data = await res.json();

    return data as UserProfile;
  }

  async updateProfilePicture(file: File): Promise<void> {
    const formData = new FormData();
    formData.append('picture', file);

    const res = await fetch(`${this.ressourceUrl}/profile-picture`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) throw new Error('Failed to upload profile picture');
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
}

export default new UserApiConnection();
