// src/api-connection/user-api-connection.ts

export type UserPost = {
  id: number;
  picture: string;
  description: string;
  created_at: string;
  likeCount: number;
  commentCount: number;
};

export type UserProfile = {
  username: string;
  profile_picture: string;
  bio: string;
  posts: UserPost[];
};

const userApiConnection = {
  async getOwnProfile(): Promise<UserProfile> {
    const res = await fetch('/api/users/me'); // Appel vers le nouvel endpoint /me

    if (!res.ok) throw new Error('Failed to load profile');

    const data = await res.json();
    return data as UserProfile;
  },
};

// async getOwnProfile(): Promise<UserProfile> {
//   const res = await fetch('/api/users/me');
//   if (!res.ok) throw new Error('Failed to load profile');

//   const data = (await res.json()) as UserProfile;
//   return data;

export default userApiConnection;
