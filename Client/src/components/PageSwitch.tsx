import RegistrationEmail from "./RegistrationEmail";
import RegistrationPassword from "./RegistrationPassword";
import RegistrationAgreements from "./RegistrationAgreement";
import RegistrationPayments from "./RegistrationPayments";
import { useRegistrationContext } from "./hooks/useRegistrationContext";
import { CreateUser } from "./Posts";
import { FormInput } from "../utils/schemas";
import { SubmitHandler } from "react-hook-form";
import { FormTypes } from "../utils/modules";

const PageSwitch = () => {
  const { page, handleSubmit, noValidateData } = useRegistrationContext();

  const mockData: FormTypes = {
    username: "stachu5",
    email: "stasiol5.olszak@gmail.com",
    password: "alamakota",
    cardName: "Stanisław",
    cardSname: "Olszak",
    cardNumber: "1234 1234 1234 1234",
    securityCode: 123,
    expiryDate: "12/24",
    paymentsOffer: 1,
    paymentsProcessing: "creditCard",
    optInSubscription: false,
  };

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    const allData: FormTypes = {
      email: data?.email,
      username: data?.email,
      password: data?.password,
      cardName: data?.cardNameSname[0],
      cardSname: data?.cardNameSname[1],
      cardNumber: data?.cardNumber,
      expiryDate: data?.expiryDate,
      securityCode: data?.securityCode,
      ...noValidateData,
    };

    // console.log(allData);
    CreateUser(allData);
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
