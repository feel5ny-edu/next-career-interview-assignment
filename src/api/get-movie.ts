import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from './common';

type RequestGetMovie = {
  id: number;
};

type ResponseGetMovie = {};

const getMovie = async (params: RequestGetMovie) => {
  const { data } = await axiosInstance.get(`/3/movie/${params.id}`);
  return data;
};

export const useGetMovie = (params: RequestGetMovie) => {
  return useQuery({
    queryFn: () => getMovie(params),
    queryKey: ['get-movie', params],
  });
};
