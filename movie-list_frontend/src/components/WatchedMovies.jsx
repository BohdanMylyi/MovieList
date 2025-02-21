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
    <div className="flex flex-col items-center h-full bg-[#F8F3D9] overflow-hidden">
      <h1 className="font-bold text-xl my-6">Watched Movies:</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-[80%]">
        {watchedMovies.length > 0 ? (
          watchedMovies.map((movie) => (
            <div
              className="card card-compact bg-base-100 w-full shadow-xl p-4"
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
                    <a className="flex flex-col">
                      <div className="rating flex mx-auto">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`mask mask-star-2 w-6 h-6 ${
                              i < Math.round(movie.vote_average / 2)
                                ? "bg-orange-400"
                                : "bg-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </a>
                  </li>
                  <li>
                    <a className="text-center mx-auto">
                      Release date: <br />
                      {movie.release_date}
                    </a>
                  </li>
                </ul>

                <div className="card-actions justify-end">
                  <button
                    onClick={() => dispatch(removeMovieFromWatched(movie.id))}
                    className="btn rounded-[50px] btn-error"
                  >
                    Delete from watched
                  </button>
                </div>
              </div>
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
