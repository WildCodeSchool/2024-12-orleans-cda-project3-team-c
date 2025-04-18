import { createBrowserRouter } from 'react-router-dom';

import App from './app';
import loaders from './loaders';
import Feed from './pages/feed';
import ProfilePage from './pages/profile-page';

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
      {
        path: '/profile',
        element: <ProfilePage />,
      },
    ],
  },
]);

export default router;
