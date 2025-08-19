import { API_KEY } from '@env';
export const getTmdbUrl = (path) => 
  `https://api.themoviedb.org/3/${path}?api_key=${API_KEY}`;

