import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { axiosInstance } from './common';
import { Movie } from './types/movie';

type RequestGetMovie = {
  id: number;
};

type ResponseGetMovie = Movie;

export const GET_MOVIE_PATH = (id: string) => `/3/movie/${id}`;

const getMovie = async (params: RequestGetMovie) => {
  const { data } = await axiosInstance.get(
    GET_MOVIE_PATH(params.id.toString())
  );
  return data;
};

export const useGetMovie = (
  params: RequestGetMovie,
  options?: UseQueryOptions<ResponseGetMovie, null>
) => {
  return useQuery<ResponseGetMovie, null>({
    queryFn: () => getMovie(params),
    queryKey: ['get-movie', params],
    ...options,
  });
};
