import type { Request } from 'express';
import express from 'express';

import userModel from '@/models/user-model';

const cookieRouter = express.Router();

// GET **************************************************
cookieRouter.get('/', async function (req: Request, res) {
  try {
    const userId = req.userId;

    if (userId === undefined) {
      res.json({ ok: false });
      return;
    }

    const user = await userModel.getLoggedInUser(userId);

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
