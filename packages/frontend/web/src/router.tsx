import { createBrowserRouter } from 'react-router-dom';

import App from './app';
import ProfileOwn from './components/profile-own';
import loaders from './loaders';
import AccountSettings from './pages/account-settings';
import DeleteAccount from './pages/delete-account';
import EditBio from './pages/edit-bio';
import EditMail from './pages/edit-mail';
import EditPassword from './pages/edit-password';
import EditUsername from './pages/edit-username';
import Feed from './pages/feed';
import Parameters from './pages/parameters';
import ProfileInformations from './pages/profile-informations';

// import Search from './search';
// import Add from './add';
// import Chat from './chat';
// import Notifications from './notifications';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/feed',
        element: <Feed />,
      },
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
        path: '/edit-username',
        element: <EditUsername />,
      },
      {
        path: '/edit-bio',
        element: <EditBio />,
      },
      {
        path: '/account-settings',
        element: <AccountSettings />,
      },
      {
        path: '/edit-mail',
        element: <EditMail />,
      },
      {
        path: '/edit-password',
        element: <EditPassword />,
      },
      {
        path: '/delete-account',
        element: <DeleteAccount />,
      },
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
      // {
      //   path: '/logout',
      //   element: <LogOut />,
      // },
      // {
      //   path: '/profile',
      //   element: <Profile />,
      // },
    ],
  },
]);

export default router;
