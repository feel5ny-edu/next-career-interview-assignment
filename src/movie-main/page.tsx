import { useState } from 'react';
import { MovieSearchSection } from './components/movie-search-section';
import { NowPlayingMovieList } from './components/now-playing-movie-list';
import { MovieSearchResultList } from './components/movie-search-result-list';

export const MovieMain = () => {
  const [searchKeyword, setSearchKeyword] = useState('');

  return (
    <>
      <MovieSearchSection
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />
      {searchKeyword ? (
        <MovieSearchResultList searchKeyword={searchKeyword} />
      ) : (
        <NowPlayingMovieList />
      )}
    </>
  );
};
