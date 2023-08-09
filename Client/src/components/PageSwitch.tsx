import RegistrationEmail from "./RegistrationEmail";
import RegistrationPassword from "./RegistrationPassword";
import RegistrationAgreements from "./RegistrationAgreement";
import RegistrationPayments from "./RegistrationPayments";
import { useRegistrationContext } from "./hooks/useRegistrationContext";
// import { CreateUser } from "./fetchAPI";
import { useEffect } from "react";
import { schema, FormInput } from "../utils/schemas";
import { SubmitHandler } from "react-hook-form";

const PageSwitch = () => {
  const { page, handleSubmit, noValidateData } = useRegistrationContext();

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    const allData = {
      ...data,
      ...noValidateData,
    };

    console.log(allData);
  };

  // const response = CreateUser(data!);

  // const {cardNameSname: "asd", ...rest} = data;
  //   const cleredData: FormInput = {
  //     email: data?.email!,
  //     password: data?.password!,
  //     paymentsOffer: data?.paymentsOffer!,
  //     cardNameSname: data?.cardName! + data?.cardSname!,
  //     cardNumber: data?.cardNumber!,
  //     expiryDate: data?.expiryDate!,
  //     securityCode: data?.securityCode!,
  //   };
  //   const response = schema?.parse(cleredData);
  //   // response?.success;
  //   console.log(response);
  // };

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
