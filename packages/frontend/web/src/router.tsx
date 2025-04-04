import { createBrowserRouter } from 'react-router-dom';

import App from './app';
import ProfileOwn from './components/profile-own';
import AccountSettings from './pages/account-settings';
// import Search from './search';
// import Add from './add';
// import Chat from './chat';
// import Notifications from './notifications';
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
        path: 'parameters',
        element: <Parameters />,
      },
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
      // {
      //   path: '/logout',
      //   element: <LogOut />,
      // },
    ],
  },
]);

export default router;
