import { useNavigate } from 'react-router-dom';
import { ResponseGetListNowPlayingMovie } from '../../api/get-list-now-playing-movie';
import { MovieList } from '../../components/movie-list-item';

export const NowPlayingMovieList = ({
  movieList,
}: {
  movieList?: ResponseGetListNowPlayingMovie;
}) => {
  const navigate = useNavigate();

  if (!movieList) return null;
  return (
    <section
      data-testid="now-playing-section"
      className="px-8 py-4 bg-slate-100 rounded-3xl"
    >
      <h2 data-testid="now-playing-title" className="text-2xl p-4">
        현재 상영중인 영화
      </h2>
      <MovieList onRoute={navigate} movieList={movieList.results} />
    </section>
  );
};
