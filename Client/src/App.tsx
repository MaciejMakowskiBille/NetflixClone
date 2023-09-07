import SignIn from "./pages/signIn/SignIn";
import SignUp from "./pages/signUp/SignUp";

import MainPage from "./pages/mainPage/mainPage";
import MoviePage from "./pages/moviePage/moviePage";
import FilteredMovies from "./pages/filteredMovies/filteredMovies";
import "./style/style.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProducersPage from "./pages/producersPage/producersPage";
import ProfileSettings2 from "./pages/profileSettings/ProfileSettings2";

const App = () => {
  return (
    <Router>
      <Routes location={location} key={location.pathname}>
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/settings" element={<ProfileSettings2 />} />
        <Route path="/" element={<MainPage />} />
        <Route path="movie/:movieType/:movieId" element={<MoviePage />} />
        <Route path="list/:type/:filter" element={<FilteredMovies />} />
        <Route path="producers" element={<ProducersPage />} />
      </Routes>
    </Router>
  );
};

export default App;
