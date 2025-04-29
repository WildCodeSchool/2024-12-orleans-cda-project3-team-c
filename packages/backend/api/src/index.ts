/* eslint-disable @typescript-eslint/consistent-type-definitions */
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import fileUpload from 'express-fileupload';
import path from 'path';
import { fileURLToPath } from 'url';

import { env } from '@app/shared';

import router from './router';

env();

const app = express();

const HOST = process.env.BACKEND_HOST ?? 'localhost';
const PORT = process.env.BACKEND_PORT ?? 3000;

const COOKIE_SECRET = process.env.COOKIE_SECRET ?? 'secret';

app.use(cookieParser(COOKIE_SECRET));

app.use(express.json());

app.use(
  cors({
    origin: `http://${process.env.FRONTEND_HOST}:${process.env.FRONTEND_PORT}`,
    credentials: true,
  }),
);

app.use(fileUpload());
app.use(
  '/cdn',
  express.static(
    path.join(fileURLToPath(import.meta.url), '..', '..', 'public'),
  ),
);

app.use('/api', router);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on http://${HOST}:${PORT}`);
});

export type * from './models/model-types';
export default app;

declare module 'Express' {
  interface Request {
    isAuthenticated?: boolean;
    userId?: number;
  }
}
