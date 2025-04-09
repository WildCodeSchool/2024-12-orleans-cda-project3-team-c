import { createBrowserRouter } from 'react-router-dom';

import App from './app';
import Forgottencomp from './components/forgotten-comp';
import SignupComp from './components/signup-comp';
import loaders from './loaders';
import Feed from './pages/feed';
import Login from './pages/login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/feed',
        element: <Feed />,
        loader: () => {
          return loaders.postLoaders.getFeedPage();
        },
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <SignupComp />,
  },
  {
    path: '/reset',
    element: <Forgottencomp />,
  },
]);

export default router;
