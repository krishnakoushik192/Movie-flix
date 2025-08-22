import { createContext, useEffect, useState } from "react";
import { getTmdbUrl } from "../utills/tmdbUrls";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ContextApi = createContext();

export const ContextProvider = ({ children }) => {
    const [movieGenresApi, setMovieGenresApi] = useState([]);
    const [tvGenresApi, setTvGenresApi] = useState([]);
    const [watchlist, setWatchlist] = useState([]);

    const genres = {
        movie: {
            "Action and Adventure": "28,12",
            "Anime": "16",
            "Comedy": "35",
            "Documentary": "99",
            "Drama": "18",
            "Fantasy": "14",
            "Kids": "10751",
            "Mystery and Thrillers": "9648,53",
            "Romance": "10749",
            "Science Fiction": "878"
        },
        tv: {
            "Action and Adventure": "10759",
            "Anime": "16",
            "Comedy": "35",
            "Documentary": "99",
            "Drama": "18",
            "Fantasy": "10765",
            "Kids": "10762",
            "Mystery and Thrillers": "9648,80",
            "Romance": "10749",
            "Science Fiction": "10765"
        }
    };

    // ✅ Save to AsyncStorage
    const saveWatchlist = async (list) => {
        try {
            const jsonValue = JSON.stringify(list);
            await AsyncStorage.setItem("watchlist", jsonValue);
        } catch (e) {
            console.error("Error saving watchlist:", e);
        }
    };

    // ✅ Load from AsyncStorage
    const loadWatchlist = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("watchlist");
            if (jsonValue != null) {
                setWatchlist(JSON.parse(jsonValue));
            }
        } catch (e) {
            console.error("Error loading watchlist:", e);
        }
    };

    // ✅ Add movie
    const addToWatchlist = (movie) => {
        setWatchlist((prev) => {
            if (!prev.some((item) => item.id === movie.id)) {
                const updatedList = [...prev, movie];
                saveWatchlist(updatedList);
                return updatedList;
            }
            return prev;
        });
    };

    // ✅ Remove movie
    const removeFromWatchlist = (id) => {
        setWatchlist((prev) => {
            const updatedList = prev.filter((movie) => movie.id !== id);
            saveWatchlist(updatedList);
            return updatedList;
        });
    };

    const movieUrl = getTmdbUrl("genre/movie/list");
    const tvUrl = getTmdbUrl("genre/tv/list");

    // Load genres
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await fetch(movieUrl);
                const data = await response.json();
                setMovieGenresApi(data.genres);
            } catch (error) {
                console.error("Error fetching genres:", error);
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
                console.error("Error fetching genres:", error);
                setTvGenresApi([]);
            }
        };
        fetchGenres();
    }, []);

    // Load watchlist on first app start
    useEffect(() => {
        loadWatchlist();
    }, []);

    return (
        <ContextApi.Provider value={{ movieGenresApi, tvGenresApi, watchlist, removeFromWatchlist, addToWatchlist, genres }}>
            {children}
        </ContextApi.Provider>
    );
};
