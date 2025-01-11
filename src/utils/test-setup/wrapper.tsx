import { MemoryRouter } from 'react-router-dom';
import { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { LocationDisplay } from './location-display';
import App from '../../App';

export const Wrapper = ({
  children,
  initialEntry = '',
}: PropsWithChildren<{
  initialEntry?: string;
}>) => (
  <QueryClientProvider client={new QueryClient()}>
    <MemoryRouter initialEntries={[initialEntry]}>{children}</MemoryRouter>
  </QueryClientProvider>
);

export const renderMain = () => {
  return render(<App />, {
    wrapper: ({ children }) => (
      <Wrapper initialEntry="/">
        {children}
        <LocationDisplay />
      </Wrapper>
    ),
  });
};

export const renderDetail = () => {
  return render(<App />, {
    wrapper: ({ children }) => (
      <Wrapper initialEntry="/movie/:id">
        {children}
        <LocationDisplay />
      </Wrapper>
    ),
  });
};
