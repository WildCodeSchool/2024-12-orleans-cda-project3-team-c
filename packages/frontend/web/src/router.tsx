import { createBrowserRouter } from 'react-router-dom';

import App from './app';
// import Search from './search';
// import Add from './add';
// import Chat from './chat';
// import Notifications from './notifications';
// import Profile from './profile';
import NotFound from './pages/not-found';

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
      {
        path: '**',
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
