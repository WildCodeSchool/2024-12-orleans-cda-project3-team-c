import type { Request } from 'express';
import express from 'express';

import { getLoggedInUser } from '@/models/user-model';

const cookieRouter = express.Router();

cookieRouter.get('/', async function (req: Request, res) {
  try {
    const userId = req.userId;

    if (userId === undefined) {
      res.json({ ok: false });
      return;
    }

    const user = await getLoggedInUser(userId);

    if (!user) {
      res.json({ ok: false });
      return;
    }
    res.json({ user, ok: true });
    return;
  } catch (error) {
    console.error(error);
    res.json(
      'not authorized, please login to get your token or check your cookies',
    );
    return;
  }
});

export default cookieRouter;
