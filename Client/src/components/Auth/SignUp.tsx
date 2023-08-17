// import PageSwitch from "./PageSwitch";

import { AuthProvider } from "../context/RegistrationContext";
import RegistrationForm from "./RegistrationForm";
// import "../../style/style.css";

export default function SignUp() {
  return (
    <AuthProvider>
      <RegistrationForm />
    </AuthProvider>
  );
}
