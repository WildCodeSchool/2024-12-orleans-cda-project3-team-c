import type { LoaderFunctionArgs } from 'react-router-dom';

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

  getUserProfileByUsername: async ({ params }: LoaderFunctionArgs) => {
    try {
      if (params.username == null || params.username === '') {
        console.error('Username parameter is missing');
        return { profile: null };
      }
      const profile = await userApiConnection.getProfileByUsername(
        params.username,
      );
      return { profile };
    } catch (error) {
      console.error('Error to get user profile by username', error);
      return { profile: null };
    }
  },
};
