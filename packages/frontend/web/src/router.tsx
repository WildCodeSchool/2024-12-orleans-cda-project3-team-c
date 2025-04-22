import { createBrowserRouter } from 'react-router-dom';

import App from './app';
import UserSuggestion from './components/user-suggestion';
import loaders from './loaders';
import CreatePostPage from './pages/create-post-page';
import Feed from './pages/feed';

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
        path: '/create',
        element: <CreatePostPage />,
      },

      {
        path: '/f',
        element: <UserSuggestion />,
      },
    ],
  },
]);

export default router;
