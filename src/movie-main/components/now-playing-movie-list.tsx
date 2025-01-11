import { ResponseGetListNowPlayingMovie } from '../../api/get-list-now-playing-movie';

export const NowPlayingMovieList = ({
  movieList,
}: {
  movieList?: ResponseGetListNowPlayingMovie;
}) => {
  if (!movieList) return null;
  return (
    <section data-testid="now-playing-section">
      <h2 data-testid="now-playing-title">현재 상영중인 영화</h2>
      <ul>
        {movieList.results.map((item) => {
          return (
            <li role="listitem" key={item.id}>
              {item.title}
            </li>
          );
        })}
      </ul>
    </section>
  );
};
