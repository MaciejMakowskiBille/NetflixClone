import "./style/style.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
      </Routes>
    </Router>
  );
};

export default App;
