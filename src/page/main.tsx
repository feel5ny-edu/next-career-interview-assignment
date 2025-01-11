import { useGetListNowPlayingMovie } from '../api/get-list-now-playing-movie';

export const MovieMain = () => {
  return (
    <>
      <section data-testid="search-section">
        <h1 data-testid="search-title">영화 List</h1>
        <input data-testid="search-input" />
        <button data-testid="search-button">검색</button>
      </section>
    </>
  );
};
