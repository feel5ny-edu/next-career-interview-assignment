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
    <section data-testid="search-section" className="px-8">
      <h1 data-testid="search-title" className="text-4xl font-bold py-8">
        영화 List
      </h1>
      <div className="flex">
        <input
          ref={inputRef}
          data-testid="search-input"
          placeholder="영화를 검색해주세요"
          onChange={handleSearchInput}
          className="w-full px-4 py-4 border-2 border-gray rounded-lg border-solid"
        />
        <button
          data-testid="search-button"
          disabled={isDisabledButton}
          onClick={handleSearchButton}
          className="min-w-28 ml-2 rounded-lg px-8 py-4 bg-slate-600 text-white"
        >
          검색
        </button>
      </div>
      <button
        className="rounded-lg px-4 py-2 my-4 border-slate-600 border-2"
        data-testid="init-search-button"
        onClick={handleInitSearch}
      >
        검색 초기화
      </button>
    </section>
  );
};
