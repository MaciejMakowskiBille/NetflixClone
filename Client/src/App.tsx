import "./style/style.css";
import RegistrationEmail from "./components/RegistrationEmail";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegistrationEmail />} />
        <Route path="movie/:movieId" element={<RegistrationEmail />} />
      </Routes>
    </Router>
  );
};

export default App;
