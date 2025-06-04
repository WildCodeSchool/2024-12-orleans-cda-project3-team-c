import type { Notification } from '@app/api';

import ApiConnection from './api-connection';

class NotificationApiConnection extends ApiConnection {
  constructor(ressource = 'notifications') {
    super(ressource);
  }

  async getNotifications(page = 1) {
    try {
      const response = await fetch(`${this.ressourceUrl}?page=${page}`);

      if (response.ok) {
        return (await response.json()) as Notification[];
      } else {
        throw new Error('Error while fetching notification page');
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

export default new NotificationApiConnection();
