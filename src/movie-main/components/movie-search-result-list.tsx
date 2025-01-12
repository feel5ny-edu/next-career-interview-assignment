import { useNavigate } from 'react-router-dom';
import { ResponseGetSearchMovie } from '../../api/get-search-movie';
import { MovieList } from '../../components/movie-list-item';

export const MovieSearchResultList = ({
  movieList,
}: {
  movieList?: ResponseGetSearchMovie;
}) => {
  const navigate = useNavigate();

  if (!movieList) return null;
  //   if (!movieList.results.length) return <>결과가 없습니다.</>;
  return (
    <section
      data-testid="movie-search-result"
      className="px-8 py-4 bg-slate-100 rounded-3xl"
    >
      <h2 data-testid="search-result-total-count" className="text-2xl p-4">
        검색 결과 {movieList.total_results}
      </h2>
      <MovieList onRoute={navigate} movieList={movieList.results} />
    </section>
  );
};
