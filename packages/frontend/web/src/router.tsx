import { createBrowserRouter } from 'react-router-dom';

import App from './app';
import ProfileOwn from './components/profile-own';
import LogOut from './log-out';
import AccountSettings from './pages/account-settings';
// import Search from './search';
// import Add from './add';
// import Chat from './chat';
// import Notifications from './notifications';
import NotFound from './pages/notfound';
import Parameters from './pages/parameters';
import ProfileInformations from './pages/profile-informations';

// import Home from './pages/home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      // {
      //   path: '/search',
      //   element: <Search />,
      // },
      // {
      //   path: '/add',
      //   element: <Add />,
      // },
      // {
      //   path: '/chat',
      //   element: <Chat />,
      // },
      // {
      //   path: '/notifications',
      //   element: <Notifications />,
      // },
      {
        path: '/profile',
        element: <ProfileOwn />,
      },
      {
        path: '/profile-informations',
        element: <ProfileInformations />,
      },
      {
        path: '/account-settings',
        element: <AccountSettings />,
      },
      {
        path: '/logout',
        element: <LogOut />,
      },
      {
        path: 'parameters',
        element: <Parameters />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
