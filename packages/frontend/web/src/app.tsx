import { Outlet } from 'react-router-dom';

import Login from './pages/login';

export default function App() {
  return (
    <div className='flex h-dvh w-full'>
      {/* <NavBarLeftWeb /> */}
      <Login />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
