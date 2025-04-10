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

app.use(express.json());
app.use(cors());
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

export default app;
export type * from './models/model-types';
