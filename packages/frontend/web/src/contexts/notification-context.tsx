import type { PropsWithChildren } from 'react';
import { createContext, useContext, useMemo, useState } from 'react';

import type { Notification } from '@app/api';

const notificationProviderContext = createContext<
  NotificationProviderState | undefined
>(undefined);

type NotificationProviderState = {
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
  areNotificationsVisible: boolean;
  setAreNotificationsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function NotificationContext({
  children,
  ...props
}: PropsWithChildren<object>) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [areNotificationsVisible, setAreNotificationsVisible] = useState(false);

  const value = useMemo(
    () => ({
      notifications,
      setNotifications,
      areNotificationsVisible,
      setAreNotificationsVisible,
    }),
    [notifications, areNotificationsVisible],
  );

  return (
    <notificationProviderContext.Provider {...props} value={value}>
      {children}
    </notificationProviderContext.Provider>
  );
}

export function useNotificationContext() {
  const context = useContext(notificationProviderContext);
  return context;
}
