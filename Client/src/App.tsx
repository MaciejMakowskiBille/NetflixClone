import "./style/style.css";
import RegistrationEmail from "./components/RegistrationEmail";
import RegistrationPayments from "./components/RegistrationPayments";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegistrationEmail />} />
        <Route path="/payments" element={<RegistrationPayments />} />
      </Routes>
    </Router>
  );
};

export default App;
