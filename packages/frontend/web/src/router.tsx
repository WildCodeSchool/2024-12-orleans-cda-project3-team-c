// router.ts
import { createBrowserRouter } from 'react-router-dom';

import App from './app';
import loaders from './loaders';
// Charger les loaders mis à jour
import CreatePostPage from './pages/create-post-page';
import EditBio from './pages/edit-bio';
import EditUsername from './pages/edit-username';
import Feed from './pages/feed';
import Parameters from './pages/parameters';
import ProfileInformations from './pages/profile-informations';
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
      {
        path: 'parameters',
        element: <Parameters />,
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
    ],
  },
]);

export default router;
