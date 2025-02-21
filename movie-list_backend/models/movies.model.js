import mongoose from "mongoose";

const WatchedMovieSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String },
  genre: { type: [String] },
  vote_average: { type: Number },
  release_date: { type: String },
  poster_path: { type: String },
  watchedAt: { type: Date, default: Date.now },
});

const WatchedMoviesSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  watchedMovies: [WatchedMovieSchema],
});

export default mongoose.model("WatchedMovies", WatchedMoviesSchema);
