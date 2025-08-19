import { API_KEY } from '@env';
export const getTmdbGenreUrl = (path, genreId) => 
  `https://api.themoviedb.org/3/${path}?api_key=${API_KEY}&with_genres=${genreId}`;

