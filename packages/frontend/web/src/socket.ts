import { io } from 'socket.io-client';

const socket = io({
  path: '/socket',
  autoConnect: false,
  transports: ['websocket'],
});

export default socket;
