import { Navigate, Outlet } from 'react-router-dom';
import { io } from 'socket.io-client';

import { useLoginContext } from '@/contexts/auth-context';

import NavBar from './components/navbar';

const socket = io({ path: '/socket' });
socket.on('connect', () => {
  console.log('front end connection ok');
});

socket.emit('connection');

export default function App() {
  const loginAuth = useLoginContext();

  const isUserLogged = loginAuth?.isUserLogged;
  const isLoading = loginAuth?.isLoading;

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
