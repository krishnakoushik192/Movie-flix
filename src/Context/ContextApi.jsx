import { createContext, useEffect, useState } from "react";
import { getTmdbUrl } from "../utills/tmdbUrls";


export const ContextApi = createContext();

export const ContextProvider = ({ children }) => {
    const [movieGenresApi, setMovieGenresApi] = useState([]);
    const [tvGenresApi, setTvGenresApi] = useState([]);
    const [watchlist, setWatchlist] = useState([]);
    const genres = {
        movie: {
            "Action and Adventure": "28,12", // Action + Adventure
            "Anime": "16", // Animation
            "Comedy": "35",
            "Documentary": "99",
            "Drama": "18",
            "Fantasy": "14",
            "Kids": "10751", // Family
            "Mystery and Thrillers": "9648,53", // Mystery + Thriller
            "Romance": "10749",
            "Science Fiction": "878"
        },
        tv: {
            "Action and Adventure": "10759",
            "Anime": "16", // Animation
            "Comedy": "35",
            "Documentary": "99",
            "Drama": "18",
            "Fantasy": "10765",
            "Kids": "10762",
            "Mystery and Thrillers": "9648,80", // Mystery + Crime
            "Romance": "10749",
            "Science Fiction": "10765" // Sci-Fi & Fantasy
        }
    };


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
        <ContextApi.Provider value={{ movieGenresApi, tvGenresApi, watchlist, removeFromWatchlist, addToWatchlist, genres }}>
            {children}
        </ContextApi.Provider>
    );
};