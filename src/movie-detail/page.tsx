import { useParams } from 'react-router-dom';
import { useGetMovie } from '../api/get-movie';

export const MovieDetail = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetMovie({ id: Number(id) });

  // TODO
  const COMMENT = '';

  if (isLoading) return <>Loading..</>;
  if (!data) return null;

  return (
    <div className="text-center">
      <h1 data-testid="movie-title" className="text-4xl p-8">
        {data.title}
      </h1>
      <img
        data-testid="movie-poster"
        src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
        className="rounded-lg"
      />
      <div data-testid="movie-vote" className="text-xl py-4">
        평점 {data.vote_average}
      </div>
      <div data-testid="movie-comment">{COMMENT}</div>
    </div>
  );
};
