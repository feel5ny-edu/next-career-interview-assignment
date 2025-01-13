import { useNavigate } from 'react-router-dom';
import { useSearchMovieInfinite } from '../../api/get-search-movie';
import { MovieList } from '../../components/movie-list-item';
import { useEffect, useRef } from 'react';

export const MovieSearchResultList = ({
  searchKeyword,
}: {
  searchKeyword: string;
}) => {
  const navigate = useNavigate();
  const lastItemRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const { hasNextPage, isFetching, fetchNextPage, data } =
    useSearchMovieInfinite({ query: searchKeyword });

  useEffect(() => {
    if (!hasNextPage || isFetching) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    if (lastItemRef.current) observer.observe(lastItemRef.current);

    observerRef.current = observer;

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetching]);

  if (!data) return null;

  return (
    <section
      data-testid="movie-search-result"
      className="px-8 py-4 bg-slate-100 rounded-3xl"
    >
      <h2 data-testid="search-result-total-count" className="text-2xl p-4">
        검색 결과 {data.pages[0].total_results}
      </h2>
      <MovieList onRoute={navigate} movieList={data.pages} />
      <div
        ref={lastItemRef}
        style={{
          height: '1px',
          margin: '1rem 0',
        }}
      />
    </section>
  );
};
