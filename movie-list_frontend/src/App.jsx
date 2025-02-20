import "./App.css";
import MoviesList from "./components/MovieList";
import WatchedMovies from "./components/WatchedMovies";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/popular-movies" element={<MoviesList />} />
            <Route path="/watched-movies" element={<WatchedMovies />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
