import { ChangeEvent, useRef, useState } from 'react';

export const MovieSearchSection = ({
  setSearchKeyword,
}: {
  setSearchKeyword: (inputData: string) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDisabledButton, setIsDisabledButton] = useState(true);

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setIsDisabledButton(!Boolean(e.target.value));
  };

  const handleSearchButton = () => {
    if (!inputRef.current) return;

    setSearchKeyword(inputRef.current.value);
  };

  const handleInitSearch = () => {
    if (!inputRef.current) return;

    inputRef.current.value = '';
    setIsDisabledButton(true);
    setSearchKeyword('');
  };

  return (
    <section data-testid="search-section">
      <h1 data-testid="search-title">영화 List</h1>
      <input
        ref={inputRef}
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
      <button data-testid="init-search-button" onClick={handleInitSearch}>
        검색 초기화
      </button>
    </section>
  );
};
