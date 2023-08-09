import RegistrationEmail from "./RegistrationEmail";
import RegistrationPassword from "./RegistrationPassword";
import RegistrationAgreements from "./RegistrationAgreement";
import RegistrationPayments from "./RegistrationPayments";
import { useRegistrationContext } from "./hooks/useRegistrationContext";
import { CreateUser } from "./fetchAPI";
import { useEffect } from "react";

const PageSwitch = () => {
  const { page, data, handleSubmit, schema } = useRegistrationContext();
  // const { handleSubmit } = useForm<FormTypes>({
  //   resolver: zodResolver(schema),
  // });
  useEffect(() => {
    console.log(data);
  }, [data]);

  const onSubmit = () => {
    // const response = CreateUser(data!);
    const response = schema?.safeParse(data);
    response?.success;
    console.log(schema?.safeParse(data));
  };

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
    <form className="form-inputs flex-col" onSubmit={handleSubmit!(onSubmit)}>
      {display[page]}
    </form>
  );

  return content;
};

export default PageSwitch;
