import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import AuthContext from './contexts/auth-context';
import NotificationContext from './contexts/notification-context';
import './globals.css';
import router from './router';

const rootElement = document.querySelector('#root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <AuthContext>
        <NotificationContext>
          <RouterProvider router={router} />
        </NotificationContext>
      </AuthContext>
    </React.StrictMode>,
  );
}
