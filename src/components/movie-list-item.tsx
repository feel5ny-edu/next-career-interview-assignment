import { MoviePagination } from '../api/types/movie';

export const MovieList = ({
  onRoute,
  movieList,
}: {
  onRoute: (path: string) => void;
  movieList: MoviePagination[];
}) => {
  return (
    <ul className="grid grid-cols-2 gap-4">
      {movieList?.map(({ results }) => {
        return results.map(({ id, title, poster_path }) => {
          return (
            <MovieListItem
              onClick={() => onRoute(`/movie/${id}`)}
              key={id}
              title={title}
              image={`https://image.tmdb.org/t/p/w500${poster_path}`}
            />
          );
        });
      })}
    </ul>
  );
};

export const MovieListItem = ({
  onClick,
  title,
  image,
}: {
  onClick: () => void;
  title: string;
  image: string;
}) => {
  return (
    <li
      role="listitem"
      onClick={onClick}
      className="hover:shadow-xl cursor-pointer p-4 rounded-xl bg-white"
    >
      <figure>
        <img src={image} className="rounded-lg" />
        <figcaption className="pt-4">
          <p>{title}</p>
        </figcaption>
      </figure>
    </li>
  );
};
