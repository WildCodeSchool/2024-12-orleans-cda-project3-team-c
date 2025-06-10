// router.ts
import { createBrowserRouter, redirect } from 'react-router-dom';

import App from './app';
import ForgottenPassword from './components/forgotten-password';
import Register from './components/register';
import loaders from './loaders';
import CreatePostPage from './pages/create-post-page';
import EditBio from './pages/edit-bio';
import EditUsername from './pages/edit-username';
import Feed from './pages/feed';
import Login from './pages/login';
import OtherProfile from './pages/other-profile';
import Parameters from './pages/parameters';
import Posts from './pages/posts';
import ProfileInformations from './pages/profile-informations';
import ProfilePage from './pages/profile-page';
import Search from './pages/search';
import SinglePostPage from './pages/single-post-page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Feed />,
        loader: () => {
          return loaders.postLoaders.getFeedPage();
        },
      },
      {
        path: '/feed',
        element: <Feed />,
        loader: () => {
          return loaders.postLoaders.getFeedPage();
        },
      },
      {
        path: '/post/:postId',
        element: <SinglePostPage />,
        loader: (route) => {
          const postId = Number(route.params.postId);
          if (isNaN(postId)) {
            return redirect('/feed');
          }
          return loaders.postLoaders.getPost(postId);
        },
      },
      {
        path: '/profile',
        element: <ProfilePage />,
        loader: loaders.userLoaders.getUserProfile,
      },
      {
        path: '/profile/:username',
        element: <OtherProfile />,
        loader: loaders.userLoaders.getUserProfileByUsername,
      },
      {
        path: '/create',
        element: <CreatePostPage />,
      },
      {
        path: '/search',
        element: <Search />,
      },
      {
        path: '/parameters',
        element: <Parameters />,
      },
      {
        path: '/posts/:username',
        element: <Posts />,
        loader: (route) => {
          const username = route.params.username;
          if (username === undefined) {
            return redirect('/feed');
          }
          return loaders.postLoaders.getUserFeed(username);
        },
      },
      {
        path: '/profile-informations',
        element: <ProfileInformations />,
        loader: loaders.userLoaders.getUserProfile,
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
