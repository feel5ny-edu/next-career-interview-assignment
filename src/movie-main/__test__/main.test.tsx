import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderMain } from '../../utils/test-setup/wrapper';
import { server } from '../../mocks/server';
import { http, HttpResponse } from 'msw';
import { GET_LIST_NOW_PLAYING_MOVIE_PATH } from '../../api/get-list-now-playing-movie';
import { vi } from 'vitest';
import { GET_SEARCH_MOVIE_PATH } from '../../api/get-search-movie';
import { getUrl } from '../../mocks/handlers';

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
    const MOCK_MOVIE_TITLE = '라이온킹';

    // GIVEN, WHEN
    renderMain();
    server.use(
      http.get(getUrl(GET_LIST_NOW_PLAYING_MOVIE_PATH), async () => {
        return HttpResponse.json({
          results: [{ id: 1, title: MOCK_MOVIE_TITLE }, { id: 2 }],
        });
      })
    );
    await waitFor(() => screen.getByText(MOCK_MOVIE_TITLE));

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
    const MOCK_MOVIE_TITLE = '해리포터';

    server.use(
      http.get(getUrl(GET_SEARCH_MOVIE_PATH), async () => {
        mockHandler();
        return HttpResponse.json({
          results: [{ id: 1, title: MOCK_MOVIE_TITLE }, { id: 2 }, { id: 3 }],
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
});
