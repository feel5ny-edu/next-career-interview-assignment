import { MemoryRouter } from 'react-router-dom';
import { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { LocationDisplay } from './location-display';
import App from '../../App';
import { SuspenseWithErrorHandling } from '../../components/suspense-with-error-boundary';

export const Wrapper = ({
  children,
  initialEntry = '',
}: PropsWithChildren<{
  initialEntry?: string;
}>) => (
  <MemoryRouter initialEntries={[initialEntry]}>
    <QueryClientProvider client={new QueryClient()}>
      <SuspenseWithErrorHandling loader={<div>Loading...</div>}>
        {children}
      </SuspenseWithErrorHandling>
    </QueryClientProvider>
  </MemoryRouter>
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

export const renderDetail = (id: string) => {
  return render(<App />, {
    wrapper: ({ children }) => (
      <Wrapper initialEntry={`/movie/${id}`}>
        {children}
        <LocationDisplay />
      </Wrapper>
    ),
  });
};
