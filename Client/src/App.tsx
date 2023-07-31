import Home from "./components/home"
import MainPage from "./components/mainPage"
import MoviePage from "./components/moviePage"
import './style/style.css'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const App = () => {

  return (
    <Router>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MainPage />}/>
        <Route path="movie/:movieId" element={<MoviePage />} />
      </Routes>
    </Router>
  )
}

export default App
