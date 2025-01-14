import { screen } from '@testing-library/react';
import { renderMain } from '../../utils/test-setup/wrapper';
import { renderMainWithAsync } from './utils/given-when';

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
