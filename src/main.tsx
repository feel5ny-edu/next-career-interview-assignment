import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './api/common.ts';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import { SuspenseWithErrorHandling } from './components/suspense-with-error-boundary.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SuspenseWithErrorHandling loader={<div>Loading...</div>}>
        <Router>
          <App />
        </Router>
      </SuspenseWithErrorHandling>
    </QueryClientProvider>
  </StrictMode>
);
