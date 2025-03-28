import { createBrowserRouter } from 'react-router-dom';

import Home from './pages/home';
import Login from './pages/login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/connexion',
    element: <Login />,
  },
]);

export default router;
