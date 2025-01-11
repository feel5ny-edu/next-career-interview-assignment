import { http, HttpResponse } from 'msw';
import { GET_LIST_NOW_PLAYING_MOVIE_PATH } from '../api/get-list-now-playing-movie';

const getUrl = (path: string) => {
  return import.meta.env.VITE_API_URL + path;
};

export const handlers = [
  http.get(getUrl(GET_LIST_NOW_PLAYING_MOVIE_PATH), () => {
    return HttpResponse.json([{ title: '1' }, { title: '2' }]);
  }),
];
