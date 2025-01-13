import '@testing-library/jest-dom';

import { beforeAll, afterEach, afterAll, vi } from 'vitest';
import { server } from '../../mocks/server';

beforeAll(() => {
  server.listen();
  vi.spyOn(window, 'scroll').mockImplementation(() => {});
});
afterEach(() => {
  server.resetHandlers();
  localStorage.clear();
});
afterAll(() => {
  server.close();
});

global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));
