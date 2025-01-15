import { http, HttpResponse } from 'msw';
import { server } from '../../../mocks/server';
import { renderDetail } from '../../../utils/test-setup/wrapper';
import { getUrl } from '../../../mocks/handlers';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { GET_MOVIE_PATH } from '../../../api/get-movie';
import { MOCK_COMMENT, MOCK_MOVIE_TITLE, MOVIE_ID } from './mock';

export const renderDetailWithAsync = async () => {
  const render = renderDetail(MOVIE_ID);

  server.use(
    http.get(getUrl(GET_MOVIE_PATH(MOVIE_ID)), async () => {
      return HttpResponse.json({
        id: MOVIE_ID,
        title: MOCK_MOVIE_TITLE,
        vote_count: 5,
        poster_path: '/jF6ceQFwbGmFxJWgmG7IBYvyb1B.jpg',
      });
    })
  );
  await waitFor(() => screen.getByText(MOCK_MOVIE_TITLE));
  return render;
};

export const submitComment = async (comment = MOCK_COMMENT) => {
  // GIVEN
  const renderResult = await renderDetailWithAsync();
  const movieCommentButton = screen.getByTestId('movie-comment-button');
  fireEvent.click(movieCommentButton);

  const movieCommentInput = screen.getByTestId('movie-comment-input');
  const movieCommentSubmitButton = screen.getByTestId(
    'movie-comment-submit-button'
  );

  // WHEN
  fireEvent.change(movieCommentInput, { target: { value: comment } });
  fireEvent.click(movieCommentSubmitButton);
  return renderResult;
};
