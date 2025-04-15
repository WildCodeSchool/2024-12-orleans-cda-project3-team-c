import ApiConnection from './api-connection';

// Définissez un type pour la réponse de l'API
type UserResponse = {
  id: number;
  username: string;
  profile_picture: string; // Assurez-vous que cette propriété est incluse
};

class UserApiConnection extends ApiConnection {
  constructor(ressource = 'users') {
    super(ressource);
  }

  async getUserById(userId: number): Promise<UserResponse | null> {
    try {
      const response = await fetch(`${this.ressourceUrl}/${userId}`);
      if (response.ok) {
        const userData: UserResponse = await response.json();
        return userData;
      } else {
        console.error('Failed to get user:', response.statusText);
        return null;
      }
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  }
}

export default new UserApiConnection();
