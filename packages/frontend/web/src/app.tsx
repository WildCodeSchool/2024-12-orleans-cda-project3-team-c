import { Navigate, Outlet } from 'react-router-dom';

import { useLoginContext } from '@/contexts/auth-context';

import BodyPortal from './components/body-portal';
import NavBar from './components/navbar';
import { useNotificationContext } from './contexts/notification-context';
import useSocket from './hooks/use-socket';
import Notifications from './pages/notifications';

export default function App() {
  const loginAuth = useLoginContext();

  const isUserLogged = loginAuth?.isUserLogged;
  const isLoading = loginAuth?.isLoading;
  const socket = useSocket();

  const notificationContext = useNotificationContext();

  if (isLoading === true) {
    return;
  }
  console.log('app: ', notificationContext);
  if (isUserLogged === false) {
    return <Navigate to={'/login'} />;
  }

  return (
    <>
      <div className='relative h-dvh w-full' id='app'>
        <NavBar />
        <main className='h-full md:ml-56'>
          <Outlet />
        </main>
      </div>
      {notificationContext?.areNotificationsVisible !== undefined &&
      notificationContext.areNotificationsVisible ? (
        <BodyPortal>
          <Notifications />
        </BodyPortal>
      ) : null}
    </>
  );
}
