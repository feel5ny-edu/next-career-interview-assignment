import { Suspense, useState } from 'react';
import { MovieSearchSection } from './components/movie-search-section';
import { NowPlayingMovieList } from './components/now-playing-movie-list';
import { MovieSearchResultList } from './components/movie-search-result-list';
import { MovieListSkeleton } from '../components/skeleton/movie-list';

export const MovieMain = () => {
  const [searchKeyword, setSearchKeyword] = useState('');

  return (
    <>
      <MovieSearchSection
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />
      <Suspense fallback={<MovieListSkeleton />}>
        {searchKeyword ? (
          <MovieSearchResultList searchKeyword={searchKeyword} />
        ) : (
          <NowPlayingMovieList />
        )}
      </Suspense>
    </>
  );
};
