import { Outlet, useLocation } from 'react-router-dom';

import NavBar from './components/navbar';

export default function App() {
  const location = useLocation();

  const hideMobileNavbarRoutes = [
    '/parameters',
    '/account-settings',
    '/edit-bio',
    '/edit-mail',
    '/edit-username',
    '/edit-password',
    '/profile-informations',
  ];

  const isMobileHidden = hideMobileNavbarRoutes.includes(location.pathname);

  return (
    <div className='flex h-dvh w-full'>
      <NavBar isMobileHidden={isMobileHidden} />
      <main className='h-full w-full'>
        <Outlet />
      </main>
    </div>
  );
}
