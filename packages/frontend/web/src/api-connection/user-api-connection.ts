import ApiConnection from './api-connection';

// Types pour les publications et le profil utilisateur
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

  // Récupérer le profil de l'utilisateur
  async getProfile(): Promise<UserProfile> {
    const res = await fetch(`${this.ressourceUrl}/profile`);

    // Gestion des erreurs de l'API
    if (!res.ok) throw new Error('Failed to load profile');

    // Récupération des données au format JSON
    const data = await res.json();
    console.log('Données de profil reçues :', data); // Vérification des données reçues

    // Retourne les données typées
    return data as UserProfile;
  }
}

export default new UserApiConnection();
