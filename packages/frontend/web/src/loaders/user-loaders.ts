import userApiConnection from '@/api-connection/user-api-connection';

export default {
  getUserProfile: async () => {
    try {
      const profile = await userApiConnection.getProfile();
      return { profile };
    } catch (error) {
      console.error('Erreur de récupération du profil:', error);
      return { profile: null };
    }
  },
};
