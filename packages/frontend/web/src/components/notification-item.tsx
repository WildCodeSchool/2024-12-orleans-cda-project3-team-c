import { Link } from 'react-router-dom';

import type { Notification } from '@app/api';

import { getDescriptionElements } from '@/utils/text-formating';

export default function NotificationItem({
  notification,
}: {
  readonly notification: Notification;
}) {
  const message = getDescriptionElements(notification.message);

  return (
    <li>
      {<Link to={`/post/${notification.redirect_to}`}>{...message}</Link>}
    </li>
  );
}
