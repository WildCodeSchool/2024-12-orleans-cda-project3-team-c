/* eslint-disable @typescript-eslint/consistent-type-definitions */
import cookieParser from 'cookie-parser';
import express from 'express';
import fileUpload from 'express-fileupload';
import { createServer } from 'node:http';
import path from 'path';
import type { DefaultEventsMap, Socket } from 'socket.io';
import { Server as SocketServer } from 'socket.io';
import { fileURLToPath } from 'url';

import { env } from '@app/shared';

import socketAuthMiddleaxre from './middlewares/auth.middleware.socket';
import router from './router';
import connectionHandler from './socket-handlers/connection-handler';
import NotificationManager from './utils/notification-manager';

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

io.on('connection', onSocketConnection);

// app.use('/api', router);
app.use('/api', router);

export const notificationManager = new NotificationManager(io);

export type * from './models/model-types';
export default app;

declare module 'Express' {
  interface Request {
    isAuthenticated?: boolean;
    userId?: number;
  }
}
