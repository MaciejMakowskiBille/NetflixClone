import MainPage from "./pages/mainPage/mainPage"
import MoviePage from "./pages/moviePage/moviePage"
import FilteredMovies from "./pages/filteredMovies/filteredMovies";
import './style/style.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProducersPage from "./pages/producersPage/producersPage";
import SelectProfilePage from "./pages/selectProfilPage/selectProfilePage";
import Home from "./pages/home/home";

const App = () => {

  return (
    <Router>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home/>} />
        <Route path="/main" element={<MainPage />}/>
        <Route path="/profile" element={<SelectProfilePage />} />
        <Route path="/movie/:movieType/:movieId" element={<MoviePage />} />
        <Route path="/list/:type/:filter" element={<FilteredMovies/>}/>
        <Route path="/producers" element={<ProducersPage/>}/>
      </Routes>
    </Router>
  )
}

export default App
