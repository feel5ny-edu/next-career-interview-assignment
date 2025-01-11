import { ChangeEvent, useRef, useState } from 'react';
import { useGetSearchMovie } from '../api/get-search-movie';

export const MovieMain = () => {
  const inputData = useRef('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isDisabledButton, setIsDisabledButton] = useState(true);

  const { data, isSuccess, isLoading } = useGetSearchMovie(
    {
      query: searchKeyword,
      page: 1,
    },
    { enabled: searchKeyword.length > 0 }
  );

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    inputData.current = e.target.value;
    if (e.target.value) setIsDisabledButton(false);
    else setIsDisabledButton(true);
  };

  const handleSearchButton = () => {
    setSearchKeyword(inputData.current);
  };

  return (
    <>
      <section data-testid="search-section">
        <h1 data-testid="search-title">영화 List</h1>
        <input
          data-testid="search-input"
          placeholder="영화를 검색해주세요"
          onChange={handleSearchInput}
        />
        <button
          data-testid="search-button"
          disabled={isDisabledButton}
          onClick={handleSearchButton}
        >
          검색
        </button>
      </section>
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
