import type { Request } from 'express';
import express from 'express';

import notificationModel from '@/models/notification-model';

const notificationsRouter = express.Router();

// GET **************************************************
notificationsRouter.get('', async (req: Request, res) => {
  const userId = req.userId;

  if (userId === undefined) {
    res.status(401).json({ error: 'Unauthorized: user not authenticated' });
    return;
  }

  let page = 1;
  if (req.query.page !== '' && req.query.page !== undefined) {
    page = +req.query.page;
    if (!page) {
      res
        .status(400)
        .json({ error: 'Bad request, you should provide a valid page number' });
      return;
    }
  }

  const data = await notificationModel.getNotifications(userId, page);
  res.json(data);
});

export default notificationsRouter;
