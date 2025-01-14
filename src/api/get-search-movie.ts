import {
  InfiniteData,
  useSuspenseInfiniteQuery,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';
import { axiosInstance } from './common';
import { MoviePagination } from './types/movie';

type RequestGetSearchMovie = {
  query: string;
  page: number;
};

export type ResponseGetSearchMovie = MoviePagination;

export const GET_SEARCH_MOVIE_PATH = '/3/search/movie';

const getSearchMovie = async (params: RequestGetSearchMovie) => {
  const { data } = await axiosInstance.get(GET_SEARCH_MOVIE_PATH, { params });
  return data;
};

export const useSearchMovie = (
  params: RequestGetSearchMovie,
  options?: Partial<UseQueryOptions<ResponseGetSearchMovie, null>>
) => {
  return useQuery({
    queryFn: () => getSearchMovie(params),
    queryKey: ['get-search-movie', params],
    ...options,
  });
};

const PAGE_SIZE = 20;
export const useSearchMovieInfinite = ({
  query,
}: Pick<RequestGetSearchMovie, 'query'>) => {
  return useSuspenseInfiniteQuery<
    ResponseGetSearchMovie,
    Error,
    InfiniteData<ResponseGetSearchMovie>,
    string[],
    number
  >({
    queryKey: ['get-search-movie-infinite', query],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      getSearchMovie({ query: query, page: pageParam }),
    getNextPageParam: (lastPage, pages) => {
      const { total_results, page } = pages[pages.length - 1];
      if (total_results === 0) return null;
      if (page * PAGE_SIZE > total_results) return null;
      return page + 1;
    },
    initialPageParam: 1,
  });
};
