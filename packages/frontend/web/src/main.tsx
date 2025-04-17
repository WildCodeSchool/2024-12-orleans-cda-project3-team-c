import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import LogContext from './contexts/login-context';
import './globals.css';
import router from './router';

const rootElement = document.querySelector('#root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <LogContext>
        <RouterProvider router={router} />
      </LogContext>
    </React.StrictMode>,
  );
}
