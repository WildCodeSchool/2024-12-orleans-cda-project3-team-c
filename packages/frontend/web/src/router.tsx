import { createBrowserRouter } from 'react-router-dom';

import UserSuggestion from './components/user-suggestion';
import Home from './pages/home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/s',
    element: <UserSuggestion />,
  },
]);

export default router;
