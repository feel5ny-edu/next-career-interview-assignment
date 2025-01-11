import { useState } from 'react';
import { useSearchMovie } from '../api/get-search-movie';
import { MovieSearchSection } from './components/movie-search-section';
import { NowPlayingMovieList } from './components/now-playing-movie-list';
import { MovieSearchResultList } from './components/movie-search-result-list';
import { useGetListNowPlayingMovie } from '../api/get-list-now-playing-movie';

export const MovieMain = () => {
  const [searchKeyword, setSearchKeyword] = useState('');

  const {
    data: searchMovieList,
    isFetched: isFetchedSearchMovieList,
    isLoading: isLoadingSearchMovieList,
  } = useSearchMovie(
    {
      query: searchKeyword,
      page: 1,
    },
    { enabled: searchKeyword.length > 0 }
  );
  const {
    data: listNowPlayingMovie,
    isFetched: isFetchedGetListNowPlayingMovie,
    isLoading: isLoadingGetListNowPlayingMovie,
  } = useGetListNowPlayingMovie({
    page: 1,
  });

  return (
    <>
      <MovieSearchSection setSearchKeyword={setSearchKeyword} />

      {/* 목록 섹션 */}
      {(isLoadingSearchMovieList || isLoadingGetListNowPlayingMovie) && (
        <>로딩중</>
      )}

      {isFetchedGetListNowPlayingMovie && (
        <NowPlayingMovieList movieList={listNowPlayingMovie} />
      )}
      {isFetchedSearchMovieList && (
        <MovieSearchResultList movieList={searchMovieList} />
      )}
    </>
  );
};
