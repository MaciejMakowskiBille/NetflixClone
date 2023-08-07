import "./style/style.css";
import Registration from "./components/Registration";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Registration />} />
      </Routes>
    </Router>
  );
};

export default App;
