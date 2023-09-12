import SignIn from "./pages/signIn/SignIn";
import SignUp from "./pages/signUp/SignUp";

import MainPage from "./pages/mainPage/mainPage";
import MoviePage from "./pages/moviePage/moviePage";
import FilteredMovies from "./pages/filteredMovies/filteredMovies";
import "./style/style.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProducersPage from "./pages/producersPage/producersPage";

import ProfileSettings from "./pages/profileSettings/ProfileSettings";

import SelectProfilePage from "./pages/selectProfilPage/selectProfilePage";
import Home from "./pages/home/home";
import FavoritesPage from "./pages/favoritesPage/favoritesPage";


const App = () => {
  return (
    <Router>
      <Routes location={location} key={location.pathname}>
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />

        <Route path="/" element={<Home />} />
        {
          localStorage.getItem("jwt") ?
          <>
            <Route path="/*" element={<MainPage/>} />
            <Route path="/movie/:movieType/:movieId" element={<MoviePage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/profile" element={<SelectProfilePage />} />
            <Route path="/list/:type/:filter" element={<FilteredMovies />} />
            <Route path="/producers" element={<ProducersPage />} />
            <Route path="favorites" element={<FavoritesPage/>}/>
          </>
          : <Route path="/*" element={<Home/>} />
        }

      </Routes>
    </Router>
  );
};

export default App;
