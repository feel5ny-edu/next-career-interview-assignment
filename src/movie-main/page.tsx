import { useState } from 'react';
import { useGetSearchMovie } from '../api/get-search-movie';
import { MovieSearchSection } from './components/movie-search-section';
import { NowPlayingMovieList } from './components/now-playing-movie-list';
import { MovieSearchResultList } from './components/movie-search-result-list';

export const MovieMain = () => {
  const [searchKeyword, setSearchKeyword] = useState('');

  const { data, isSuccess, isFetched, isLoading } = useGetSearchMovie(
    {
      query: searchKeyword,
      page: 1,
    },
    { enabled: searchKeyword.length > 0 }
  );
  const isShowNowPlayingMovieList = !isSuccess && !isLoading;
  const isShowSearchResult = isFetched;

  return (
    <>
      <MovieSearchSection setSearchKeyword={setSearchKeyword} />
      {/* 목록 섹션 */}
      {isLoading && <>로딩중</>}

      {isShowNowPlayingMovieList && <NowPlayingMovieList />}
      {isShowSearchResult && <MovieSearchResultList movieList={data} />}
    </>
  );
};
