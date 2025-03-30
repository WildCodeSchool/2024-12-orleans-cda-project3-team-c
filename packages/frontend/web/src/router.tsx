import { createBrowserRouter } from 'react-router-dom';

import App from './app';
import ProfileOwn from './components/profile-own';
import AccountSettings from './pages/account-settings';
// import Add from './add';
// import Chat from './chat';
// import Notifications from './notifications';
import NotFound from './pages/notfound';
import Parameters from './pages/parameters';
import ProfileInformations from './pages/profile-informations';
// import LogOut from './pages/log-out';
import Search from './pages/search';
import SearchResults from './pages/search-results';

// import Home from './pages/home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/search',
        element: <Search />,
      },
      {
        path: '/search-results',
        element: <SearchResults />,
      },
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
      // {
      //   path: '/logout',
      //   element: <LogOut />,
      // },
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
