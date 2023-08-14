import PageSwitch from "./PageSwitch";
import { AuthProvider } from "../context/RegistrationContext";
// import "../../style/style.css";

export default function Registration() {
  return (
    <AuthProvider>
      <PageSwitch />
    </AuthProvider>
  );
}
