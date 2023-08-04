import "./style/style.css";
import RegistrationEmail from "./components/RegistrationEmail";
import RegistrationPayments from "./components/RegistrationPayments";
import RegistrationAgreements from "./components/RegistrationAgreement";
import RegistrationPassword from "./components/RegistrationPassword";
import Registration from "./components/Registration";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegistrationEmail />} />
        <Route path="/payments" element={<RegistrationPayments />} />
        <Route path="/agreements" element={<RegistrationAgreements />} />
        <Route path="/password" element={<RegistrationPassword />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </Router>
  );
};

export default App;
