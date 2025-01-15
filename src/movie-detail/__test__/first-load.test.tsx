import { http, HttpResponse } from 'msw';
import { server } from '../../mocks/server';
import { renderDetail } from '../../utils/test-setup/wrapper';
import { getUrl } from '../../mocks/handlers';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { GET_MOVIE_PATH } from '../../api/get-movie';
import App from '../../App';

const MOVIE_ID = '123';
const renderDetailWithAsync = async () => {
  const render = renderDetail(MOVIE_ID);
  const MOCK_MOVIE_TITLE = '라이온킹';

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

const MOCK_COMMENT = '재미있네요!';
const submitComment = async (comment = MOCK_COMMENT) => {
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

  it('상세페이지 진입시 id에 매칭되는 한줄평을 로컬스토리지에서 조회할 수 있다.', async () => {
    const { rerender } = await submitComment();

    rerender(<App />);

    expect(screen.getByText(MOCK_COMMENT)).toBeInTheDocument();
  });
});

describe('한줄 평 작성', () => {
  it('"한줄평 작성하기"버튼을 누르면 Input과 제출버튼이 노출된다.', async () => {
    await renderDetailWithAsync();
    const movieCommentButton = screen.getByTestId('movie-comment-button');
    fireEvent.click(movieCommentButton);

    const movieCommentInput = screen.getByTestId('movie-comment-input');
    const movieCommentSubmitButton = screen.getByTestId(
      'movie-comment-submit-button'
    );
    expect(movieCommentInput).toBeInTheDocument();
    expect(movieCommentSubmitButton).toBeInTheDocument();
  });

  it('한줄평을 작성한 후 제출버튼을 누르면 input이 비노출된다.', async () => {
    await submitComment();

    const movieCommentForm = screen.queryByTestId('movie-comment-form');
    expect(movieCommentForm).not.toBeInTheDocument();
  });
  it('한줄평을 작성한 후 제출버튼을 누르면 작성한 한줄평이 노출된다.', async () => {
    await submitComment();

    const movieCommentForm = screen.queryByTestId('movie-comment-item');
    expect(movieCommentForm).toBeInTheDocument();
  });
  it('한줄평을 작성한 후 제출버튼을 누르면 로컬스토리지에 데이터가 저장된다.', async () => {
    await submitComment();

    const storedData = JSON.parse(
      localStorage.getItem('movie-comment') || '{}'
    );

    /**
     * { [movie-id]: string }
     */
    expect(storedData).toEqual({ 123: MOCK_COMMENT });
  });
  it('한줄평을 작성한 후 제출버튼을 누르면, 한줄평 앞뒤 trim처리가 된다.', async () => {
    const MOCK_COMMENT = ' 재미 없어요..';
    const EXPECT_COMMENT = '재미 없어요..';
    await submitComment(MOCK_COMMENT);

    const storedData = JSON.parse(
      localStorage.getItem('movie-comment') || '{}'
    );

    expect(storedData).toEqual({ 123: EXPECT_COMMENT });
  });
});
