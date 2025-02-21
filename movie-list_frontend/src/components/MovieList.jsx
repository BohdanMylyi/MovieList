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
    <div className="flex flex-col items-center bg-[#F8F3D9]">
      <h1 className="font-bold text-xl my-6">Popular Movies:</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-[80%]">
        {popularMovies.map((movie) => (
          <div
            className="card card-compact bg-[#F7F7F7] w-full shadow-xl p-4"
            key={movie.id}
          >
            <figure>
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                className="rounded-xl"
              />
            </figure>
            <div className="card-body flex flex-col items-center">
              <h2 className="card-title">{movie.title}</h2>

              <ul className="menu bg-base-200 rounded-box w-56">
                <li>
                  <a>Rating: {movie.vote_average}</a>
                </li>
                <li>
                  <a>Release date: {movie.release_date}</a>
                </li>
              </ul>
              <div className="card-actions justify-end">
                <button
                  onClick={() => dispatch(addMovieToWatched(movie))}
                  disabled={watchedMovies.some((m) => m.id === movie.id)}
                  className="btn rounded-[50px] bg-[#B9B28A]"
                >
                  {watchedMovies.some((m) => m.id === movie.id)
                    ? "Watched"
                    : "Add to Watched"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesList;
