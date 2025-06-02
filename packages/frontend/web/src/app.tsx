import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useLoginContext } from '@/contexts/auth-context';

import NavBar from './components/navbar';
import socket from './socket';

// socket.on('connect', () => {
//   console.log('front end connection ok 2');
//   console.log(socket);
//   socket.emit('join:rooms', { message: 'create room', room: 'teddy' });
// });

// socket.connect();

// socket.emit('connection');

export default function App() {
  const loginAuth = useLoginContext();

  const isUserLogged = loginAuth?.isUserLogged;
  const isLoading = loginAuth?.isLoading;
  const user = loginAuth?.user;

  useEffect(() => {
    const onConnect = () => {
      console.log('connection front OK');
      if (user?.id !== undefined) {
        console.log(user.id);
        socket.emit('join:rooms', { userId: user.id, foo: 'bar' });
      }
    };

    socket.on('connect', onConnect);

    socket.connect();
  }, [user?.id]);

  if (isLoading === true) {
    return;
  }

  if (isUserLogged === false) {
    return <Navigate to={'/login'} />;
  }

  return (
    <div className='relative h-dvh w-full' id='app'>
      <NavBar />
      <main className='h-full md:ml-56'>
        <Outlet />
      </main>
    </div>
  );
}
