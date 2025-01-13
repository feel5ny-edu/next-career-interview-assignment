import { ChangeEvent, useRef, useState } from 'react';
import { InputWithButton } from '../../components/input-button';

export const MovieSearchSection = ({
  searchKeyword,
  setSearchKeyword,
}: {
  searchKeyword: string;
  setSearchKeyword: (inputData: string) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDisabledButton, setIsDisabledButton] = useState(true);

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setIsDisabledButton(!Boolean(e.target.value));
  };

  const handleSearchButton = () => {
    if (!inputRef.current) return;

    window.scroll(0, 0);
    setSearchKeyword(inputRef.current.value);
  };

  const handleInitSearch = () => {
    if (!inputRef.current) return;

    window.scroll(0, 0);
    inputRef.current.value = '';
    setIsDisabledButton(true);
    setSearchKeyword('');
  };

  return (
    <section
      data-testid="search-section"
      className="p-8 mb-4 sticky top-0 bg-gray-200 z-50 rounded-b-xl"
    >
      <h1 data-testid="search-title" className="text-4xl font-bold py-8">
        영화 List
      </h1>

      <InputWithButton>
        <InputWithButton.Input
          ref={inputRef}
          onChange={handleSearchInput}
          dataTestId="search-input"
          placeholder="영화를 검색해주세요"
        />
        <InputWithButton.Button
          onClick={handleSearchButton}
          dataTestId="search-button"
          disabled={isDisabledButton}
        >
          검색
        </InputWithButton.Button>
      </InputWithButton>
      {searchKeyword && (
        <div className="flex justify-end mt-4">
          <button
            className="rounded-lg px-4 py-2 mb-4 border-slate-600 border-2"
            data-testid="init-search-button"
            onClick={handleInitSearch}
          >
            검색 초기화
          </button>
        </div>
      )}
    </section>
  );
};
