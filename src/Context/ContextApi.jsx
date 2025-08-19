import { createContext, useEffect, useState } from "react";
import { getTmdbUrl } from "../utills/tmdbUrls";


export const ContextApi = createContext();

export const ContextProvider = ({ children }) => {
    const [movieGenresApi, setMovieGenresApi] = useState([]);
    const [tvGenresApi, setTvGenresApi] = useState([]);
    const [watchlist, setWatchlist] = useState([]);

    const addToWatchlist = (movie) => {
        if (!watchlist.some(item => item.id === movie.id)) {
            setWatchlist(prev => [...prev, movie]);
        }
    };
    const removeFromWatchlist = (id) => {
        setWatchlist(prev => prev.filter(movie => movie.id !== id));
    };

    const movieUrl = getTmdbUrl('genre/movie/list');
    const tvUrl = getTmdbUrl('genre/tv/list');

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await fetch(movieUrl);
                const data = await response.json();
                setMovieGenresApi(data.genres);
            } catch (error) {
                console.error('Error fetching genres:', error);
                setMovieGenresApi([]);
            }
        };
        fetchGenres();
    }, []);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await fetch(tvUrl);
                const data = await response.json();
                setTvGenresApi(data.genres);
            } catch (error) {
                console.error('Error fetching genres:', error);
                setTvGenresApi([]);
            }
        };
        fetchGenres();
    }, []);

    return (
        <ContextApi.Provider value={{ movieGenresApi, tvGenresApi, watchlist , removeFromWatchlist, addToWatchlist }}>
            {children}
        </ContextApi.Provider>
    );
};