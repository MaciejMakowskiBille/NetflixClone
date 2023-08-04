import RegistrationEmail from "./RegistrationEmail";
import RegistrationPassword from "./RegistrationPassword";
import RegistrationAgreements from "./RegistrationAgreement";
import RegistrationPayments from "./RegistrationPayments";
import { useRegistrationContext } from "./hooks/useRegistrationContext";
import { useEffect } from "react";

const PageSwitch = () => {
  const { page, onSubmit, data } = useRegistrationContext();

  useEffect(() => {
    console.log(data);
  }, [data]);

  interface displayArray {
    [index: number]: JSX.Element;
  }

  const display: displayArray = {
    0: <RegistrationEmail />,
    1: <RegistrationPassword />,
    2: <RegistrationAgreements />,
    3: <RegistrationPayments />,
  };

  const content = (
    <form className="form-inputs flex-col" onSubmit={onSubmit!}>
      {display[page]}
    </form>
  );

  return content;
};

export default PageSwitch;
