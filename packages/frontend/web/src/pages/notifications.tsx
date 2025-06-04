import { useRef } from 'react';

import notificationApiConnection from '@/api-connection/notification-api-connection';
import { useNotificationContext } from '@/contexts/notification-context';
import useInfiniteScroll from '@/hooks/use-infinite-scroll';

import backIcon from '../assets/icons/arrow-left-white.svg';
import NotificationItem from '../components/notification-item';

export default function Notifications() {
  const notificationContext = useNotificationContext();
  const infiniteScrollTrigger = useRef(null);

  useInfiniteScroll(infiniteScrollTrigger, observeInfiniteScroll);

  const hideNotifications = () => {
    if (notificationContext?.setAreNotificationsVisible !== undefined) {
      notificationContext.setAreNotificationsVisible(false);
    }
  };

  let page = 0;

  async function getNotifications() {
    const newNotifications =
      await notificationApiConnection.getNotifications(page);

    if (notificationContext?.setNotifications !== undefined) {
      notificationContext.setNotifications((currentNotifications) => {
        return [...currentNotifications, ...newNotifications];
      });
    }
  }

  async function observeInfiniteScroll(observers: IntersectionObserverEntry[]) {
    if (observers[0].isIntersecting) {
      page++;
      await getNotifications();
    }
  }

  return (
    <section className='fixed bottom-0 left-0 z-10 h-screen w-dvw bg-purple-950'>
      <header className='p-4'>
        <button
          type='button'
          className='font-title relative block h-8 w-full text-center text-base md:text-2xl'
          onClick={hideNotifications}
        >
          <img
            src={backIcon}
            aria-hidden='true'
            alt=''
            className='absolute top-0 left-0 w-8'
          />
          {'Notifications'}
        </button>
      </header>
      <div className='px-4 pb-4'>
        <ul>
          {notificationContext?.notifications.map((notification) => {
            return <NotificationItem key={notification?.id} />;
          })}
        </ul>
        <div ref={infiniteScrollTrigger} />
      </div>
    </section>
  );
}
