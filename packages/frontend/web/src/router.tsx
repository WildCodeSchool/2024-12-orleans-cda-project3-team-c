import { createBrowserRouter } from 'react-router-dom';

import Feed from './pages/feed';
import Home from './pages/home';
import posts from './posts-mock';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/feed',
    element: <Feed />,
    loader: () => {
      console.log(posts);
      return posts;
    },
  },
]);

export default router;
