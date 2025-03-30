import { Outlet } from 'react-router-dom';

import NavBarLeftWeb from './components/navbar-left-web';

export default function App() {
  return (
    <div className='flex h-full w-full'>
      <NavBarLeftWeb />
      <main className='w-dvh items-center'>
        <Outlet />
      </main>
    </div>
  );
}
