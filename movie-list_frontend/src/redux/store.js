import { configureStore } from "@reduxjs/toolkit";
import watchedMoviesReducer from "./watchedMoviesSlice";

export const store = configureStore({
  reducer: {
    watchedMovies: watchedMoviesReducer,
  },
});
