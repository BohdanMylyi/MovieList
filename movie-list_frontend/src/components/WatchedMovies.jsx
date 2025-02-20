import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWatchedMovies,
  removeMovieFromWatched,
} from "../redux/watchedMoviesSlice";

const WatchedMovies = () => {
  const dispatch = useDispatch();
  const watchedMovies = useSelector((state) => state.watchedMovies.movies);
  const [, setPopularMovies] = useState([]);

  useEffect(() => {
    dispatch(fetchWatchedMovies());

    axios
      .get("http://localhost:5000/api/movies/popular-movies")
      .then((res) => setPopularMovies(res.data.results))
      .catch((err) => console.error(err));
  }, [dispatch]);

  return (
    <div>
      <h2>Watched movies:</h2>
      <div className="movies-grid">
        {watchedMovies.length > 0 ? (
          watchedMovies.map((movie) => (
            <div key={movie.id} style={{ width: "200px", textAlign: "center" }}>
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                style={{ width: "100%" }}
              />
              <h3>{movie.title}</h3>
              <button
                onClick={() => dispatch(removeMovieFromWatched(movie.id))}
              >
                Delete from watched
              </button>
            </div>
          ))
        ) : (
          <p>There are no watched movies.</p>
        )}
      </div>
    </div>
  );
};

export default WatchedMovies;
