import { Navigate, Outlet } from 'react-router-dom';

import { useLoginContext } from '@/contexts/login-context';

export default function App() {
  const loginAuth = useLoginContext();

  const isUserLogged = loginAuth?.isUserLogged;
  const isLoading = loginAuth?.isLoading;

  if (isLoading) {
    return;
  }

  if (!isUserLogged) {
    return <Navigate to={'/login'} />;
  }

  return (
    <div className='flex h-dvh w-full'>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
