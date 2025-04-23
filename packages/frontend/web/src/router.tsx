// router.ts
import { createBrowserRouter } from 'react-router-dom';

import App from './app';
import loaders from './loaders';
// Charger les loaders mis à jour
import CreatePostPage from './pages/create-post-page';
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
        loader: loaders.userLoaders.getUserProfile,
      },
      {
        path: '/create',
        element: <CreatePostPage />,
      },
    ],
  },
]);

export default router;
