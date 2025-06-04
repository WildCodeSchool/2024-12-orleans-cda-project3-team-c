import type { DefaultEventsMap, Server } from 'socket.io';

import notificationModel from '@/models/notification-model';

export default class NotificationManager {
  socketServer: Server;

  constructor(socketServer: Server) {
    this.socketServer = socketServer;
  }

  async newLike(postId: number, likerId: number) {
    try {
      const notification = await notificationModel.newLike(postId, likerId);

      this.socketServer
        .to(`user-${notification?.recipient_id}`)
        .emit('notification:new', notification);
    } catch (error) {
      console.error(error);
    }
  }
}
