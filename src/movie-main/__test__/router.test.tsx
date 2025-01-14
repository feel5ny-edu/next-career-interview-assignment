import { fireEvent, screen } from '@testing-library/react';
import { renderMainWithAsync, searchMovie } from './utils/given-when';

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
