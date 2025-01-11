import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderMain } from '../../utils/test-setup/wrapper';
import { server } from '../../mocks/server';
import { http, HttpResponse } from 'msw';
import { GET_LIST_NOW_PLAYING_MOVIE_PATH } from '../../api/get-list-now-playing-movie';
import { vi } from 'vitest';
import { GET_SEARCH_MOVIE_PATH } from '../../api/get-search-movie';
import { getUrl } from '../../mocks/handlers';

const renderMainWithAsync = async () => {
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

const MOCK_MOVIE_TITLE = '해리포터';
const MOCK_LIST = [{ id: 1, title: MOCK_MOVIE_TITLE }, { id: 2 }, { id: 3 }];
const searchMovie = async () => {
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

describe('첫 노출', () => {
  it('메인페이지 진입시, 검색 섹션이 노출되어있다.', () => {
    // GIVEN, WHEN
    renderMain();

    // THEN
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('영화를 검색해주세요')
    ).toBeInTheDocument();

    expect(screen.getByTestId('search-title')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      '영화 List'
    );

    expect(screen.getByTestId('search-button')).toBeInTheDocument();
    expect(screen.getByTestId('search-section')).toBeInTheDocument();
  });

  it('메인페이지 진입시, 현재 상영 중인 영화 목록을 확인할 수 있다.', async () => {
    await renderMainWithAsync();

    // THEN
    expect(screen.getByTestId('now-playing-section')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByTestId('now-playing-title')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      '현재 상영중인 영화'
    );
  });
});

describe('영화 검색', () => {
  it('검색어를 한글자 이상 입력해야, 검색버튼이 활성화된다.', () => {
    // GIVEN
    renderMain();

    // WHEN
    const searchInput = screen.getByTestId('search-input');
    const searchButton = screen.getByTestId('search-button');
    // 검색어 입력 전: 버튼 비활성화 상태 확인
    expect(searchButton).toBeDisabled();

    // 한 글자 입력
    fireEvent.change(searchInput, { target: { value: 'a' } });

    // 입력 후: 버튼 활성화 확인
    expect(searchButton).toBeEnabled();
  });

  it('검색어를 입력 후 검색버튼을 누르면 영화가 검색된다.', async () => {
    const mockHandler = vi.fn();

    server.use(
      http.get(getUrl(GET_SEARCH_MOVIE_PATH), async () => {
        mockHandler();
        return HttpResponse.json({
          results: MOCK_LIST,
        });
      })
    );

    // GIVEN
    renderMain();

    // WHEN
    const searchInput = screen.getByTestId('search-input');
    const searchButton = screen.getByTestId('search-button');
    fireEvent.change(searchInput, { target: { value: MOCK_MOVIE_TITLE } });
    fireEvent.click(searchButton);

    await waitFor(() => screen.getByText(MOCK_MOVIE_TITLE));

    // 핸들러가 호출되었는지 확인
    expect(mockHandler).toHaveBeenCalled();
  });

  it('영화가 검색되면 검색된 영화의 갯수가 노출된다.', async () => {
    await searchMovie();

    const searchResultTotalCount = screen.getByTestId(
      'search-result-total-count'
    );
    // 핸들러가 호출되었는지 확인
    expect(searchResultTotalCount).toHaveTextContent('검색 결과 100');
  });

  it('영화가 검색되면 검색된 영화 목록이 노출된다.', async () => {
    await searchMovie();
    expect(screen.getAllByRole('listitem')).toHaveLength(MOCK_LIST.length);
  });

  it('영화가 검색되면 "검색 초기화"버튼이 노출된다.', async () => {
    await searchMovie();

    const initSearchButton = screen.getByTestId('init-search-button');
    expect(initSearchButton).toBeInTheDocument();
  });

  it('검색 초기화버튼을 누르면 상영 중인 영화목록이 노출된다.', async () => {
    // Given
    await searchMovie();

    // When
    const initSearchButton = screen.getByTestId('init-search-button');
    fireEvent.click(initSearchButton);

    expect(screen.getByTestId('now-playing-section')).toBeInTheDocument();
    expect(screen.getByTestId('now-playing-title')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      '현재 상영중인 영화'
    );
  });
});

describe('페이지 이동', () => {
  it('현재 상영중인 영화를 클릭하면 영화 상세화면으로 이동한다.', async () => {
    await renderMainWithAsync();
    const listItem = screen.getAllByRole('listitem');
    fireEvent.click(listItem[0]);

    expect(screen.getByTestId('location-display')).toHaveTextContent(
      /\/movie\/\d+/
    );
  });

  it('검색된 영화를 클릭하면 영화 상세화면으로 이동한다.', async () => {
    await searchMovie();
    const listItem = screen.getAllByRole('listitem');
    fireEvent.click(listItem[0]);

    expect(screen.getByTestId('location-display')).toHaveTextContent(
      /\/movie\/\d+/
    );
  });
});
