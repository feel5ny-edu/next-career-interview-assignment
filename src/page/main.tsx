import { ChangeEvent, useState } from 'react';

export const MovieMain = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
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
        <button data-testid="search-button" disabled={!Boolean(searchKeyword)}>
          검색
        </button>
      </section>
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
    </>
  );
};
