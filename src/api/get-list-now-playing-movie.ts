import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import { axiosInstance } from './common';

type RequestGetListNowPlayingMovie = {
  page: number;
};

export type ResponseGetListNowPlayingMovie = {
  results: {
    id: number;
    title: string;
  }[];
};

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
