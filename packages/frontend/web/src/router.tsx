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
      // {
      //   path: '/profile',
      //   element: <Profile />,
      // },
    ],
  },
]);

export default router;
