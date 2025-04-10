import { Outlet } from 'react-router-dom';

import NavBarLeftWeb from './components/navbar';

export default function App() {
  return (
    <div className='h-dvh w-full'>
      {/* <NavBarLeftWeb /> */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}
