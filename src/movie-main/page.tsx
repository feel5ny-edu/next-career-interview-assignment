import { useState } from 'react';
import {
  ResponseGetSearchMovie,
  useSearchMovie,
} from '../api/get-search-movie';
import { MovieSearchSection } from './components/movie-search-section';
import { NowPlayingMovieList } from './components/now-playing-movie-list';
import { MovieSearchResultList } from './components/movie-search-result-list';
import {
  ResponseGetListNowPlayingMovie,
  useGetListNowPlayingMovie,
} from '../api/get-list-now-playing-movie';

export const MovieMain = () => {
  const [searchKeyword, setSearchKeyword] = useState('');

  const { data: searchMovieList, isLoading: isLoadingSearchMovieList } =
    useSearchMovie(
      {
        query: searchKeyword,
        page: 1,
      },
      { enabled: searchKeyword.length > 0 }
    );

  const {
    data: listNowPlayingMovie,
    isLoading: isLoadingGetListNowPlayingMovie,
  } = useGetListNowPlayingMovie({
    page: 1,
  });

  return (
    <>
      <MovieSearchSection
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />

      <MovieListSection
        isLoading={isLoadingSearchMovieList || isLoadingGetListNowPlayingMovie}
        searchMovieList={searchMovieList}
        listNowPlayingMovie={listNowPlayingMovie}
      />
    </>
  );
};

const MovieListSection = ({
  isLoading,
  searchMovieList,
  listNowPlayingMovie,
}: {
  isLoading: boolean;
  searchMovieList?: ResponseGetSearchMovie;
  listNowPlayingMovie?: ResponseGetListNowPlayingMovie;
}) => {
  if (isLoading) return <>로딩중</>;
  if (searchMovieList)
    return <MovieSearchResultList movieList={searchMovieList} />;
  if (listNowPlayingMovie)
    return <NowPlayingMovieList movieList={listNowPlayingMovie} />;
};
