import { API_KEY } from '@env';


export const getTmdbUrl = (path) => 
  `https://api.themoviedb.org/3/${path}?api_key=${API_KEY}`;

export const getTmdbGenreUrl = (path, genreId) => 
  `https://api.themoviedb.org/3/${path}?api_key=${API_KEY}&with_genres=${genreId}`;

export const getMultiSearchUrl = (path, query) =>
  `https://api.themoviedb.org/3/search/${path}?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;