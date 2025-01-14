import { renderMain } from '../../../utils/test-setup/wrapper';
import { server } from '../../../mocks/server';
import { http, HttpResponse } from 'msw';
import { GET_LIST_NOW_PLAYING_MOVIE_PATH } from '../../../api/get-list-now-playing-movie';
import { GET_SEARCH_MOVIE_PATH } from '../../../api/get-search-movie';
import { getUrl } from '../../../mocks/handlers';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { MOCK_LIST, MOCK_MOVIE_TITLE } from './mock';

export const renderMainWithAsync = async () => {
  renderMain();
  const MOCK_MOVIE_TITLE = '라이온킹';

  server.use(
    http.get(getUrl(GET_LIST_NOW_PLAYING_MOVIE_PATH), async () => {
      return HttpResponse.json({
        results: [{ id: 1, title: MOCK_MOVIE_TITLE }, { id: 2 }],
      });
    })
  );
  await waitFor(() => screen.getByText(MOCK_MOVIE_TITLE));
};

export const searchMovie = async () => {
  server.use(
    http.get(getUrl(GET_SEARCH_MOVIE_PATH), async () => {
      return HttpResponse.json({
        results: MOCK_LIST,
        total_results: 100,
      });
    })
  );

  // GIVEN
  renderMainWithAsync();

  // WHEN
  const searchInput = screen.getByTestId('search-input');
  const searchButton = screen.getByTestId('search-button');
  fireEvent.change(searchInput, { target: { value: MOCK_MOVIE_TITLE } });
  fireEvent.click(searchButton);

  await waitFor(() => screen.getByText(MOCK_MOVIE_TITLE));
};
