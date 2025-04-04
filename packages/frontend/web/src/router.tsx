import { createBrowserRouter } from 'react-router-dom';

import App from './app';
import ProfileOwn from './components/profile-own';
// import Search from './search';
// import Add from './add';
// import Chat from './chat';
// import Notifications from './notifications';
import Parameters from './pages/parameters';

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
    ],
  },
]);

export default router;
