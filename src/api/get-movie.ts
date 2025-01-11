import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { axiosInstance } from './common';

type RequestGetMovie = {
  id: number;
};

type ResponseGetMovie = {
  adult: boolean;
  belongs_to_collection: {
    id: number;
    name: string; //'Gladiator Collection';
    poster_path: string; //'/jF6ceQFwbGmFxJWgmG7IBYvyb1B.jpg';
    backdrop_path: string; //'/1VdLvSIeHuwqCT13H9EafxCacGB.jpg';
  };
  genres: { id: number; name: string }[];
  id: number;
  original_title: string;
  overview: string;
  backdrop_path: string; // '/euYIwmwkmz95mnXvufEmbL6ovhZ.jpg';
  poster_path: string; // '/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg';
  production_countries: [
    {
      iso_3166_1: 'US';
      name: 'United States of America';
    }
  ];
  release_date: string; // '2024-11-05';
  title: string;
  revenue: number;
  runtime: number;
  vote_average: number;
  vote_count: number;
};

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
