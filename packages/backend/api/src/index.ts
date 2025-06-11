/* eslint-disable @typescript-eslint/consistent-type-definitions */
import cookieParser from 'cookie-parser';
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

app.use(fileUpload());
app.use(
  '/cdn',
  express.static(
    path.join(fileURLToPath(import.meta.url), '..', '..', 'public'),
  ),
);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on http://${HOST}:${PORT}`);
});

app.use('/api', router);

export type * from './models/model-types';
export default app;

declare module 'Express' {
  interface Request {
    isAuthenticated?: boolean;
    userId?: number;
  }
}
