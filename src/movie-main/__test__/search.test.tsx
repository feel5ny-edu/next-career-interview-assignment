import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderMain } from '../../utils/test-setup/wrapper';
import { server } from '../../mocks/server';
import { http, HttpResponse } from 'msw';
import { vi } from 'vitest';
import { GET_SEARCH_MOVIE_PATH } from '../../api/get-search-movie';
import { getUrl } from '../../mocks/handlers';
import { MOCK_LIST, MOCK_MOVIE_TITLE } from './utils/mock';
import { renderMainWithAsync, searchMovie } from './utils/given-when';

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

  it('검색어를 입력 후 검색버튼을 누르면, 검색어의 앞뒤 trim처리가 되어 검색된다.', async () => {
    const getSearchParams = async (query: string) => {
      let searchParams = null;

      server.use(
        http.get(getUrl(GET_SEARCH_MOVIE_PATH), async ({ request }) => {
          // 요청한 query parameter 갖고오기
          searchParams = new URLSearchParams(
            new URL(request.url).searchParams
          ).get('query');
        })
      );

      fireEvent.change(searchInput, { target: { value: query } });
      fireEvent.click(searchButton);

      await waitFor(() => screen.getByTestId('loader'));

      return searchParams;
    };

    // GIVEN
    renderMain();

    // WHEN
    const searchInput = screen.getByTestId('search-input');
    const searchButton = screen.getByTestId('search-button');

    const MOCK_QUERY_1 = ' 반지의 제왕';
    const MOCK_QUERY_2 = '반지의 제왕 ';
    const MOCK_QUERY_3 = ' 반지의 제왕 ';
    const MOCK_TITLE = '반지의 제왕';

    // THEN
    expect(await getSearchParams(MOCK_QUERY_1)).toBe(MOCK_TITLE);
    expect(await getSearchParams(MOCK_QUERY_2)).toBe(MOCK_TITLE);
    expect(await getSearchParams(MOCK_QUERY_3)).toBe(MOCK_TITLE);
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
    const initSearchButton = screen.queryByText(/검색\s*초기화/i);

    expect(initSearchButton).not.toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: MOCK_MOVIE_TITLE } });
    fireEvent.click(searchButton);

    await waitFor(() => screen.getByText(MOCK_MOVIE_TITLE));

    expect(screen.queryByText(/검색\s*초기화/i)).toBeInTheDocument();
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
