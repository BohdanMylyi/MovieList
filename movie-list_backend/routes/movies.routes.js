import express from "express";
import {
  getPopularMovies,
  getWatchedMovies,
  addWatchedMovie,
  removeWatchedMovie,
} from "../controllers/movies.controllers.js";

const router = express.Router();

router.get("/popular-movies", getPopularMovies);

router.get("/watched/:userId", getWatchedMovies);

router.post("/watched", addWatchedMovie);

router.delete("/watched", removeWatchedMovie);

export default router;
