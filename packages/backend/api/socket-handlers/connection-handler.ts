import type { DefaultEventsMap, Socket } from 'socket.io';

import discussionModel from '@/models/discussion-model';

export default function connectionHandler(io, socket: Socket) {
  async function joinRooms(payload) {
    console.log('joining room');

    const roomIds = await discussionModel.getDiscussionIdsByUser(
      payload.userId,
    );

    await socket.join(`user-${payload.userId}`);
    for (const roomId of roomIds) {
      await socket.join(`discussion-${roomId.discussion_id}`);
    }
  }
  socket.on('join:rooms', joinRooms);
}
