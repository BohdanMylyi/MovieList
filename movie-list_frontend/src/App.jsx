import WatchedMoviesPage from "./pages/WatchedMoviesPage";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/popular-movies" element={<HomePage />} />
            <Route path="/watched-movies" element={<WatchedMoviesPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
