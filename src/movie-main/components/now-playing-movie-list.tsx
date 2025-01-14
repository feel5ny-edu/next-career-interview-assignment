import { useNavigate } from 'react-router-dom';
import { useGetListNowPlayingMovieInfinite } from '../../api/get-list-now-playing-movie';
import { MovieList } from '../../components/movie-list-item';
import { useEffect, useRef } from 'react';

export const NowPlayingMovieList = () => {
  const navigate = useNavigate();
  const lastItemRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    isFetched,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useGetListNowPlayingMovieInfinite();

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

    return () => {
      observer.disconnect();
    };
  }, [isFetched]);

  if (!data) return null;

  return (
    <section
      data-testid="now-playing-section"
      className="px-8 py-4 bg-slate-100 rounded-3xl"
    >
      <h2 data-testid="now-playing-title" className="text-2xl p-4">
        현재 상영중인 영화
      </h2>
      <MovieList onRoute={navigate} movieList={data?.pages} />
      <div
        ref={lastItemRef}
        style={{
          height: '3px',
          margin: '1rem 0',
        }}
      />
      {isFetchingNextPage && <div>isFetching...</div>}
    </section>
  );
};
