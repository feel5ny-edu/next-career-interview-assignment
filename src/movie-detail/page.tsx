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
    <>
      <h1 data-testid="movie-title">{data.title}</h1>
      <img
        data-testid="movie-poster"
        src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
      />
      <div data-testid="movie-vote">{data.vote_average}</div>
      <div data-testid="movie-comment">{COMMENT}</div>
    </>
  );
};
