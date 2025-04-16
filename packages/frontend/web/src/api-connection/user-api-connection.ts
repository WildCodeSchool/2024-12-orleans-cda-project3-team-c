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

  async getOwnProfile(): Promise<UserProfile> {
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

    if (!res.ok) throw new Error('Erreur lors de l’upload de la photo');
  }
}

export default new UserApiConnection();
