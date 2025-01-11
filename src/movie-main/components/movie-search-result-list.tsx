import { ResponseGetSearchMovie } from '../../api/get-search-movie';

export const MovieSearchResultList = ({
  movieList,
}: {
  movieList?: ResponseGetSearchMovie;
}) => {
  if (!movieList) return null;
  //   if (!movieList.results.length) return <>결과가 없습니다.</>;
  return (
    <section data-testid="movie-search-result">
      <h2 data-testid="">검색 결과 {movieList.results.length}</h2>
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