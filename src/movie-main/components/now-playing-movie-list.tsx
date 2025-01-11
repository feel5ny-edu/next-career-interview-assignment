export const NowPlayingMovieList = () => {
  return (
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
  );
};
