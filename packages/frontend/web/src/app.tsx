import { Outlet } from 'react-router-dom';

import NavBarLeftWeb from './components/navbar-left-web';
import NavBarMobile from './components/navbar-mobile';

export default function App() {
  return (
    <div className='flex h-dvh w-full'>
      <NavBarLeftWeb />
      <NavBarMobile />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
