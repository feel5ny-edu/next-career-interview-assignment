import { screen } from '@testing-library/react';
import { renderMain } from '../../test/wrapper';

describe('첫 노출', () => {
  it('메인페이지 진입시 검색 섹션이 노출되어있다.', () => {
    renderMain();
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('search-button')).toBeInTheDocument();
    expect(screen.getByTestId('search-section')).toBeInTheDocument();
    expect(screen.getByTestId('search-title')).toBeInTheDocument();
  });
});
