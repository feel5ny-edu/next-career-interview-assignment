import { http, HttpResponse } from 'msw';
import { server } from '../../mocks/server';
import { renderDetail } from '../../utils/test-setup/wrapper';
import { getUrl } from '../../mocks/handlers';
import { screen, waitFor } from '@testing-library/react';
import { GET_MOVIE_PATH } from '../../api/get-movie';

const MOVIE_ID = 123;
const renderDetailWithAsync = async () => {
  renderDetail(MOVIE_ID);
  const MOCK_MOVIE_TITLE = '라이온킹';

  server.use(
    http.get(getUrl(GET_MOVIE_PATH(1)), async () => {
      return HttpResponse.json({
        id: MOVIE_ID,
        title: MOCK_MOVIE_TITLE,
        vote_average: 5,
        poster_path:
          'https://image.tmdb.org/t/p/w500/jF6ceQFwbGmFxJWgmG7IBYvyb1B.jpg',
      });
    })
  );
  await waitFor(() => screen.getByText(MOCK_MOVIE_TITLE));
};

describe('첫 노출', () => {
  it('상세페이지 진입시 id에 매칭되는 영화정보를 확인할 수 있다. (사진, 제목, 별점, 한줄평)', async () => {
    await renderDetailWithAsync();
    const movieTitle = screen.getByTestId('movie-title');
    const moviePoster = screen.getByTestId('movie-poster');
    const movieVote = screen.getByTestId('movie-vote');
    const movieComment = screen.getByTestId('movie-comment');

    expect(movieTitle).toBeInTheDocument();
    expect(moviePoster).toBeInTheDocument();
    expect(movieVote).toBeInTheDocument();
    expect(movieComment).toBeInTheDocument();
  });
});
