import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { axiosInstance } from './common';

type RequestGetSearchMovie = {
  query: string;
  page: number;
};

export type ResponseGetSearchMovie = {
  results: {
    id: number;
    title: string;
  }[];
  total_results: number;
};

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
