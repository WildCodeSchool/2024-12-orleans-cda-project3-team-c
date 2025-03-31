import { createBrowserRouter } from 'react-router-dom';

import ForgottenPassword from './pages/forgotten-password';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/connexion',
    element: <Login />,
  },
  {
    path: '/inscription',
    element: <Signup />,
  },
  {
    path: '/forgotten',
    element: <ForgottenPassword />,
  },
]);

export default router;
