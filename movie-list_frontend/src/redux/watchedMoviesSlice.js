import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getWatchedMovies, addToWatched, removeFromWatched } from "../api";

const userId = "user123";

export const fetchWatchedMovies = createAsyncThunk(
  "watchedMovies/fetchWatched",
  async () => {
    return await getWatchedMovies(userId);
  }
);

export const addMovieToWatched = createAsyncThunk(
  "watchedMovies/addMovie",
  async (movie) => {
    return await addToWatched(userId, movie);
  }
);

export const removeMovieFromWatched = createAsyncThunk(
  "watchedMovies/removeMovie",
  async (movieId) => {
    return await removeFromWatched(userId, movieId);
  }
);

const watchedMoviesSlice = createSlice({
  name: "watchedMovies",
  initialState: { movies: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWatchedMovies.fulfilled, (state, action) => {
        console.log("Watched movies data:", action.payload);
        state.movies = action.payload;
      })
      .addCase(addMovieToWatched.fulfilled, (state, action) => {
        state.movies = action.payload;
      })
      .addCase(removeMovieFromWatched.fulfilled, (state, action) => {
        state.movies = action.payload;
      });
  },
});

export default watchedMoviesSlice.reducer;
