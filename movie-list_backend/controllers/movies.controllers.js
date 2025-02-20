import axios from "axios";
import WatchedMovies from "../models/movies.model.js";

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async (req, res) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {
      params: { api_key: TMDB_API_KEY, language: "en-US" },
    });
    res.set("Cache-Control", "no-store");
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getWatchedMovies = async (req, res) => {
  const { userId } = req.params;
  try {
    const watchedMovies = await WatchedMovies.findOne({ userId });
    if (!watchedMovies) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ watchedMovies: watchedMovies.watchedMovies });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addWatchedMovie = async (req, res) => {
  const { userId, movie } = req.body;
  try {
    let user = await WatchedMovies.findOne({ userId });
    if (!user) {
      user = new WatchedMovies({ userId, watchedMovies: [] });
    }
    user.watchedMovies.push(movie);
    await user.save();
    res.json({ watchedMovies: user.watchedMovies });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removeWatchedMovie = async (req, res) => {
  const { userId, movieId } = req.body;
  try {
    const user = await WatchedMovies.findOne({ userId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.watchedMovies = user.watchedMovies.filter(
      (movie) => movie.id !== movieId
    );
    await user.save();
    res.json({ watchedMovies: user.watchedMovies });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
