import axios from "axios";

const API_URL = "http://localhost:5000/api/movies";

export const getWatchedMovies = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/watched/${userId}`);
    return response.data.watchedMovies;
  } catch (error) {
    console.error("Error fetching watched movies:", error);
    throw error;
  }
};

export const addToWatched = async (userId, movie) => {
  try {
    const response = await axios.post(`${API_URL}/watched`, { userId, movie });
    return response.data.watchedMovies;
  } catch (error) {
    console.error("Error adding movie to watched:", error);
    throw error;
  }
};

export const removeFromWatched = async (userId, movieId) => {
  try {
    const response = await axios.delete(`${API_URL}/watched`, {
      data: { userId, movieId },
    });
    return response.data.watchedMovies;
  } catch (error) {
    console.error("Error removing movie from watched:", error);
    throw error;
  }
};
