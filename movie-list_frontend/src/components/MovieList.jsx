import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWatchedMovies,
  addMovieToWatched,
} from "../redux/watchedMoviesSlice";

const MoviesList = () => {
  const dispatch = useDispatch();
  const watchedMovies = useSelector((state) => state.watchedMovies.movies);
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    dispatch(fetchWatchedMovies());

    axios
      .get("http://localhost:5000/api/movies/popular-movies")
      
      .then((res) => setPopularMovies(res.data.results))
      .catch((err) => console.error(err));
      
  }, [dispatch]);

  return (
    <div>
      <h2>Popular movies:</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {popularMovies.map((movie) => (
          <div key={movie.id} style={{ width: "200px", textAlign: "center" }}>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              style={{ width: "100%" }}
            />
            <h3>{movie.title}</h3>
            <p>Rating: {movie.vote_average}</p>
            <p>Release date: {movie.release_date}</p>
            <button
              onClick={() => dispatch(addMovieToWatched(movie))}
              disabled={watchedMovies.some((m) => m.id === movie.id)}
            >
              {watchedMovies.some((m) => m.id === movie.id)
                ? "Watched"
                : "Add to Watched"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesList;
