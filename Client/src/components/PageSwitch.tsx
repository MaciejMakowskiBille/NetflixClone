import RegistrationEmail from "./RegistrationEmail";
import RegistrationPassword from "./RegistrationPassword";
import RegistrationAgreements from "./RegistrationAgreement";
import RegistrationPayments from "./RegistrationPayments";
import { useRegistrationContext } from "./hooks/useRegistrationContext";
import { useEffect } from "react";
import { FormTypes, schema } from "./context/RegistrationContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const PageSwitch = () => {
  const { page, onSubmit, data } = useRegistrationContext();
  const { handleSubmit } = useForm<FormTypes>({
    resolver: zodResolver(schema),
  });
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
    <form className="form-inputs flex-col" onSubmit={handleSubmit(onSubmit!)}>
      {display[page]}
    </form>
  );

  return content;
};

export default PageSwitch;