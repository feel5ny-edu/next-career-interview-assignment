import {
  InfiniteData,
  useSuspenseInfiniteQuery,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import { axiosInstance } from './common';
import { MoviePagination } from './types/movie';

type RequestGetListNowPlayingMovie = {
  page: number;
};

export type ResponseGetListNowPlayingMovie = MoviePagination;

export const GET_LIST_NOW_PLAYING_MOVIE_PATH = '/3/movie/now_playing';

const getListNowPlayingMovie = async (
  params: RequestGetListNowPlayingMovie
) => {
  const { data } = await axiosInstance.get(GET_LIST_NOW_PLAYING_MOVIE_PATH, {
    params,
  });
  return data;
};

export const useGetListNowPlayingMovie = (
  params: RequestGetListNowPlayingMovie,
  options?: Partial<UseQueryOptions<ResponseGetListNowPlayingMovie, null>>
): UseQueryResult<ResponseGetListNowPlayingMovie, null> => {
  return useQuery({
    queryKey: ['get-list-now-playing-movie', params],
    queryFn: () => getListNowPlayingMovie(params),
    ...options,
  });
};

const PAGE_SIZE = 20;
export const useGetListNowPlayingMovieInfinite = () => {
  return useSuspenseInfiniteQuery<
    ResponseGetListNowPlayingMovie,
    Error,
    InfiniteData<ResponseGetListNowPlayingMovie>,
    string[],
    number
  >({
    queryKey: ['get-search-movie-infinite'],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      getListNowPlayingMovie({ page: pageParam }),
    getNextPageParam: (lastPage, pages) => {
      const { total_results, page } = pages[pages.length - 1];
      if (total_results === 0) return null;
      if (page * PAGE_SIZE > total_results) return null;
      return page + 1;
    },
    initialPageParam: 1,
  });
};
