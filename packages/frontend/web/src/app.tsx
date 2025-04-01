import { Outlet } from 'react-router-dom';

import NavBarLeftWeb from './components/navbar-left-web';

export default function App() {
  return (
    <div className='flex h-dvh w-dvh'>
      <NavBarLeftWeb />
      <main className='mt-30 w-dvh'>
        <Outlet />
      </main>
    </div>
  );
}
