/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { parse, serialize } from 'cookie';
import cookieParser from 'cookie-parser';
import express from 'express';
import fileUpload from 'express-fileupload';
import { createServer } from 'node:http';
import path from 'path';
import connectionHandler from 'socket-handlers/connection-handler';
import type { DefaultEventsMap, Socket } from 'socket.io';
import { Server as SocketServer } from 'socket.io';
import { fileURLToPath } from 'url';

import { env } from '@app/shared';

import socketAuthMiddleaxre from './middlewares/auth.middleware.socket';
import getRouter from './router';

env();

const app = express();

const HOST = process.env.BACKEND_HOST ?? 'localhost';
const PORT = process.env.BACKEND_PORT ?? 3000;

const COOKIE_SECRET = process.env.COOKIE_SECRET ?? 'secret';

app.use(cookieParser(COOKIE_SECRET));

app.use(express.json());

app.use(fileUpload());
app.use(
  '/cdn',
  express.static(
    path.join(fileURLToPath(import.meta.url), '..', '..', 'public'),
  ),
);
const httpServer = createServer(app);

httpServer.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on http://${HOST}:${PORT}`);
});

const io = new SocketServer(httpServer, {
  path: '/socket',
});

function onSocketConnection(socket: Socket) {
  connectionHandler(io, socket);
}

io.use(socketAuthMiddleaxre);
// io.use(cookieParser(COOKIE_SECRET));

io.on(
  'connection',
  onSocketConnection,
  //   (socket) => {
  //   console.log('New connection');
  //   // console.log(socket);
  //   // const cookies = parse(socket.handshake.headers.cookie);

  //   // console.log(cookies);
  //   socket.emit('message', 'New connection successful');

  //   socket.on('create:room', (socket) => {
  //     console.log('create:room');
  //   });
  // }
);

// app.use('/api', router);
app.use('/api', getRouter(io));

export type * from './models/model-types';
export default app;

declare module 'Express' {
  interface Request {
    isAuthenticated?: boolean;
    userId?: number;
  }
}
