import { io } from 'socket.io-client';

const socket = io({
  path: '/socket',
  autoConnect: false,
  transports: ['websocket'],
});

socket.on('notification:new', (notification) => {
  console.log(notification);
});

export default socket;
