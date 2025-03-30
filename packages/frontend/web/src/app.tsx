import { Outlet } from 'react-router-dom';

import NavBarLeftWeb from './components/navbar-left-web';

export default function App() {
  return (
    <div className='flex h-dvh w-full'>
      <NavBarLeftWeb />
      <main className='flex-grow p-4'>
        <Outlet />
      </main>
    </div>
  );
}
