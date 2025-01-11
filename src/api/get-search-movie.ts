import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from './common';

type RequestGetSearchMovie = {
  query: string;
  page: number;
};

type ResponseGetSearchMovie = {};

const getSearchMovie = async (params: RequestGetSearchMovie) => {
  const { data } = await axiosInstance.get('/3/search/movie', { params });
  return data;
};

export const useGetSearchMovie = (params: RequestGetSearchMovie) => {
  return useQuery({
    queryFn: () => getSearchMovie(params),
    queryKey: ['get-search-movie', params],
  });
};
