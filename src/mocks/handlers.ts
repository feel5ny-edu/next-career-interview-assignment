import { http, HttpResponse } from 'msw';

const getUrl = (path: string) => {
  return import.meta.env.VITE_API_URL + path;
};

export const handlers = [
  http.get(getUrl('/3/movie/now_playing'), () => {
    return HttpResponse.json([{ title: '1' }, { title: '2' }]);
  }),
];
