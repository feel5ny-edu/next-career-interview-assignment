import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from './common';

type RequestGetListNowPlayingMovie = {
  page: number;
};

type ResponseGetListNowPlayingMovie = {};

const getListNowPlayingMovie = async (
  params: RequestGetListNowPlayingMovie
) => {
  const { data } = await axiosInstance.get('/3/movie/now_playing', { params });
  return data;
};

export const useGetListNowPlayingMovie = (
  params: RequestGetListNowPlayingMovie
) => {
  return useQuery({
    queryFn: () => getListNowPlayingMovie(params),
    queryKey: ['get-list-now-playing-movie', params],
  });
};
