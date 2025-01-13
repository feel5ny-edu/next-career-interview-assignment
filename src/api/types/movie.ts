export type Movie = {
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
  release_date: string; // '2024-11-05';
  title: string;
  revenue: number;
  runtime: number;
  vote_average: number;
  vote_count: number;
};

export type MoviePagination = {
  page: number;
  results: Movie[];
  total_results: number;
};
