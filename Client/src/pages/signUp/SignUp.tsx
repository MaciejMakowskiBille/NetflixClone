import { AuthProvider } from "./contexts/RegistrationContext";
import RegistrationForm from "./components/RegistrationForm";

export default function SignUp() {
  return (
    <AuthProvider>
      <RegistrationForm />
    </AuthProvider>
  );
}
