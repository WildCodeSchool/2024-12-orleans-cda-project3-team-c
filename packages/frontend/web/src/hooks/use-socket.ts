import { useEffect } from 'react';
import { io } from 'socket.io-client';

import { useLoginContext } from '@/contexts/auth-context';
import { useNotificationContext } from '@/contexts/notification-context';

export default function useSocket() {
  const loginAuth = useLoginContext();
  const user = loginAuth?.user;

  const notificationContext = useNotificationContext();

  const socket = io({
    path: '/socket',
    autoConnect: false,
    transports: ['websocket'],
  });

  socket.on('notification:new', (notification) => {
    console.log(notification);
  });

  useEffect(() => {
    const onConnect = () => {
      console.log('connection front OK');
      if (user?.id !== undefined) {
        console.log(user.id);
        socket.emit('join:rooms', { userId: user.id, foo: 'bar' });
      }
    };

    socket.on('connect', onConnect);

    socket.connect();

    return () => {
      socket.off('connect', onConnect);
      socket.disconnect();
    };
  }, [user?.id]);

  return socket;
}
