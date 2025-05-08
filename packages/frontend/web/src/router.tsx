// router.ts
import { createBrowserRouter } from 'react-router-dom';

import App from './app';
// Charger les loaders mis à jour
import ForgottenPassword from './components/forgotten-password';
import Register from './components/register';
import loaders from './loaders';
import CreatePostPage from './pages/create-post-page';
import Feed from './pages/feed';
import Login from './pages/login';
import ProfilePage from './pages/profile-page';
import Search from './pages/search';

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
        path: '/search',
        element: <Search />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/forgotten-password',
    element: <ForgottenPassword />,
  },
]);

export default router;
