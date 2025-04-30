import { Navigate, Outlet } from 'react-router-dom';

import { useLoginContext } from '@/contexts/auth-context';

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
  console.log(isUserLogged);
  return (
    <div className='relative h-dvh w-full'>
      {/* <NavBar /> */}
      <main className='h-full w-full'>
        <Outlet />
      </main>
    </div>
  );
}
