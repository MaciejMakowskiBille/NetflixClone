import MainPage from "./pages/mainPage/mainPage"
import MoviePage from "./pages/moviePage/moviePage"
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
