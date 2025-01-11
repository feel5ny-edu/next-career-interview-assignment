import { http, HttpResponse } from 'msw';
import { GET_LIST_NOW_PLAYING_MOVIE_PATH } from '../api/get-list-now-playing-movie';
import { GET_SEARCH_MOVIE_PATH } from '../api/get-search-movie';

export const getUrl = (path: string) => {
  return import.meta.env.VITE_API_URL + path;
};

export const handlers = [
  http.get(getUrl(GET_LIST_NOW_PLAYING_MOVIE_PATH), () => {
    return HttpResponse.json({ results: [{ title: '1' }, { title: '2' }] });
  }),
  http.get(getUrl(GET_SEARCH_MOVIE_PATH), () => {
    return HttpResponse.json({ results: [{ title: '1' }, { title: '2' }] });
  }),
];
