import RegistrationEmail from "./RegistrationEmail";
import RegistrationPassword from "./RegistrationPassword";
import RegistrationAgreements from "./RegistrationAgreement";
import RegistrationPayments from "./RegistrationPayments";
import SuccessModal from "./ui/SuccessModal";
import { useRegistrationContext } from "./hooks/useRegistrationContext";
// import { CreateUser } from "./Posts";
import { FormInput } from "../utils/schemas";
import { SubmitHandler } from "react-hook-form";
import { FormTypes } from "../utils/modules";
import { useState } from "react";
import axios, { isAxiosError } from "axios";
import { UserPostResponseTypes } from "../utils/modules";

interface modalTypes {
  success: boolean;
  content: string;
}

interface UserTypes extends FormTypes {
  createdAt: string;
  updatedAt: string;
}

interface ResponseTypes {
  jwt: string;
  user: UserTypes;
}

const PageSwitch = () => {
  const { page, handleSubmit, noValidateData } = useRegistrationContext();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState<modalTypes>({
    success: false,
    content: "Spróbuj ponownie!",
  });

  // const mockData: FormTypes = {
  //   username: "stachu5",
  //   email: "stasiol5.olszak@gmail.com",
  //   password: "alamakota",
  //   cardName: "Stanisław",
  //   cardSname: "Olszak",
  //   cardNumber: "1234 1234 1234 1234",
  //   securityCode: 123,
  //   expiryDate: "12/24",
  //   paymentsOffer: 1,
  //   paymentsProcessing: "creditCard",
  //   optInSubscription: false,
  // };

  // const handleSubmitModal = () => {
  //   setShowModal(true);
  // };

  // interface ErrorType {
  //   data: object {

  //   };
  //   status: number;
  // }
  const authURL = "http://localhost:1337/api/auth";

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
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

    axios
      .post<UserPostResponseTypes>(authURL + `/local/register`, allData)
      .then((response) => {
        console.log(response.data.jwt);
        localStorage.setItem("jwt", response.data.jwt);
        setModalData({
          success: true,
          content: "Udało się pomyślnie zarejestrować!",
        });
      })
      .catch((err) => {
        if (isAxiosError(err)) {
          if (err.response?.status == 400) {
            setModalData({
              success: false,
              content:
                "Użytkownik o takim emailu już istnieje. Spróbuj ponownie!",
            });
            console.log(
              "Użytkownik o takim emailu już istnieje. Spróbuj ponownie!"
            );
          }
        } else {
          setModalData({
            success: false,
            content: "Nieoczekiwany błąd, Spróbuj ponownie!",
          });
          // console.log("Nieoczekiwany błąd");
        }
      });

    setShowModal(true);
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
    <div>
      {showModal && (
        <SuccessModal
          title={modalData.success ? "Sukces" : "Uwaga"}
          content={modalData.content}
        />
      )}
      <form className="form-inputs flex-col" onSubmit={handleSubmit!(onSubmit)}>
        {display[page]}
      </form>
    </div>
  );

  return content;
};

export default PageSwitch;
