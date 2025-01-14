import { PropsWithChildren, ReactNode, Suspense } from 'react';
import { ErrorBoundary, ErrorFallback } from './error-boundary';

export const SuspenseWithErrorHandling = ({
  children,
  loader,
}: PropsWithChildren<{ loader: ReactNode }>) => {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <Suspense fallback={loader}>{children}</Suspense>
    </ErrorBoundary>
  );
};
