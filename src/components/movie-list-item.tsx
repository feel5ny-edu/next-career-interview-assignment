import { Movie } from '../api/types/movie';

export const MovieList = ({
  onRoute,
  movieList,
}: {
  onRoute: (path: string) => void;
  movieList: Movie[];
}) => {
  return (
    <ul className="grid grid-cols-3 gap-4">
      {movieList.map((item) => {
        return (
          <MovieListItem
            onClick={() => onRoute(`/movie/${item.id}`)}
            key={item.id}
            title={item.title}
            image={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
          />
        );
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
