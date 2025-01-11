import { ChangeEvent, useRef, useState } from 'react';

export const MovieSearchSection = ({
  setSearchKeyword,
}: {
  setSearchKeyword: (inputData: string) => void;
}) => {
  const inputData = useRef('');
  const [isDisabledButton, setIsDisabledButton] = useState(true);

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    inputData.current = e.target.value;
    if (e.target.value) setIsDisabledButton(false);
    else setIsDisabledButton(true);
  };

  const handleSearchButton = () => {
    setSearchKeyword(inputData.current);
  };

  return (
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
      <button data-testid="init-search-button">검색 초기화</button>
    </section>
  );
};
