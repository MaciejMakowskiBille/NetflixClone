import RegistrationEmail from "./RegistrationEmail";
import RegistrationPassword from "./RegistrationPassword";
import RegistrationAgreements from "./RegistrationAgreement";
import RegistrationPayments from "./RegistrationPayments";
import { useRegistrationContext } from "./hooks/useRegistrationContext";

const PageSwitch = () => {
  const { page } = useRegistrationContext();

  const display = {
    0: <RegistrationEmail />,
    1: <RegistrationPassword />,
    2: <RegistrationAgreements />,
    3: <RegistrationPayments />,
  };

  const content = <div className="form-inputs flex-col">{display[page]}</div>;

  return content;
};

export default PageSwitch;
