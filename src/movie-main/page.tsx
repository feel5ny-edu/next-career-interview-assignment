import { useState } from 'react';
import { useGetSearchMovie } from '../api/get-search-movie';
import { MovieSearchSection } from './components/movie-search-section';
import { NowPlayingMovieList } from './components/now-playing-movie-list';

export const MovieMain = () => {
  const [searchKeyword, setSearchKeyword] = useState('');

  const { data, isSuccess, isLoading } = useGetSearchMovie(
    {
      query: searchKeyword,
      page: 1,
    },
    { enabled: searchKeyword.length > 0 }
  );
  const isShowNowPlayingMovieList = !isSuccess && !isLoading;

  return (
    <>
      <MovieSearchSection setSearchKeyword={setSearchKeyword} />

      {isShowNowPlayingMovieList && <NowPlayingMovieList />}

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
