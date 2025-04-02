import { createBrowserRouter } from 'react-router-dom';

import loaders from './loaders';
import Feed from './pages/feed';
import Home from './pages/home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/feed',
    element: <Feed />,
    loader: () => {
      return loaders.postLoaders.getFeedPage();
    },
  },
]);

export default router;
