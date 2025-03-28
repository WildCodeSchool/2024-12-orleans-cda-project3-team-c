import { createBrowserRouter } from 'react-router-dom';

import App from './app';
import NotFound from './pages/notfound';
import Parameters from './pages/parameters';
// import Search from './search';
// import Add from './add';
// import Chat from './chat';
// import Notifications from './notifications';
import Profile from './pages/profile';

// import Home from './pages/home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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
  {
    path: '/parameters',
    element: <Parameters />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '**',
    element: <NotFound />,
  },
]);

export default router;
