import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import AppRoutes from './routes';

import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from './components/ui/sonner';
import { UserContextProvider } from './context';

const queryClient = new QueryClient()
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
        <Toaster richColors toastOptions={{ duration: 2500 }}/>
      </UserContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);