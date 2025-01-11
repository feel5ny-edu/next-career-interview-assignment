import { useState } from 'react';
import { useGetSearchMovie } from '../api/get-search-movie';
import { MovieSearchSection } from './components/movie-search-section';

export const MovieMain = () => {
  const [searchKeyword, setSearchKeyword] = useState('');

  const { data, isSuccess, isLoading } = useGetSearchMovie(
    {
      query: searchKeyword,
      page: 1,
    },
    { enabled: searchKeyword.length > 0 }
  );

  return (
    <>
      <MovieSearchSection setSearchKeyword={setSearchKeyword} />

      {!isSuccess && !isLoading && (
        <section data-testid="now-playing-section">
          <h2 data-testid="now-playing-title">현재 상영중인 영화</h2>
          <ul>
            {[{ id: 1 }, { id: 2 }, { id: 3 }].map((item) => {
              return (
                <li role="listitem" key={item.id}>
                  {item.id}
                </li>
              );
            })}
          </ul>
        </section>
      )}
      {isLoading && <>로딩중</>}
      {isSuccess && (
        <section data-testid="movie-search-result">
          <h2 data-testid="">검색 결과 {data?.results?.length}</h2>
          <ul>
            {data?.results?.map((item) => {
              return (
                <li role="listitem" key={item.id}>
                  {item.title}
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </>
  );
};
