import { Outlet } from 'react-router-dom';

import NavBarLeftWeb from './components/navbar';
import UserSuggestion from './components/user-suggestion';

export default function App() {
  return (
    <div className='h-dvh w-full'>
      {/* <NavBarLeftWeb /> */}
      <main>
        <Outlet />
        <UserSuggestion />
      </main>
    </div>
  );
}
