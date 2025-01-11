import { useState } from 'react';
import { useGetSearchMovie } from '../api/get-search-movie';
import { MovieSearchSection } from './components/movie-search-section';
import { NowPlayingMovieList } from './components/now-playing-movie-list';
import { MovieSearchResultList } from './components/movie-search-result-list';
import { useGetListNowPlayingMovie } from '../api/get-list-now-playing-movie';

export const MovieMain = () => {
  const [searchKeyword, setSearchKeyword] = useState('');

  const { data, isFetched, isLoading } = useGetSearchMovie(
    {
      query: searchKeyword,
      page: 1,
    },
    { enabled: searchKeyword.length > 0 }
  );
  const { data: listNowPlayingMovie, isFetched: isFetchedListNowPlayingMovie } =
    useGetListNowPlayingMovie({
      page: 1,
    });

  const isShowNowPlayingMovieList = isFetchedListNowPlayingMovie;
  const isShowSearchResult = isFetched;

  return (
    <>
      <MovieSearchSection setSearchKeyword={setSearchKeyword} />

      {/* 목록 섹션 */}
      {isLoading && <>로딩중</>}

      {isShowNowPlayingMovieList && (
        <NowPlayingMovieList movieList={listNowPlayingMovie} />
      )}
      {isShowSearchResult && <MovieSearchResultList movieList={data} />}
    </>
  );
};
