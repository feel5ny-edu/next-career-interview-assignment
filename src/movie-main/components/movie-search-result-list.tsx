import { useNavigate } from 'react-router-dom';
import { ResponseGetSearchMovie } from '../../api/get-search-movie';

export const MovieSearchResultList = ({
  movieList,
}: {
  movieList?: ResponseGetSearchMovie;
}) => {
  const navigate = useNavigate();

  if (!movieList) return null;
  //   if (!movieList.results.length) return <>결과가 없습니다.</>;
  return (
    <section data-testid="movie-search-result">
      <h2 data-testid="search-result-total-count">
        검색 결과 {movieList.total_results}
      </h2>
      <ul>
        {movieList.results.map((item) => {
          return (
            <li
              role="listitem"
              key={item.id}
              onClick={() => {
                navigate(`/movie/${item.id}`);
              }}
            >
              {item.title}
            </li>
          );
        })}
      </ul>
    </section>
  );
};
