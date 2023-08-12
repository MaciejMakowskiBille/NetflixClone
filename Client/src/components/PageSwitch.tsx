import RegistrationEmail from "./RegistrationEmail";
import RegistrationPassword from "./RegistrationPassword";
import RegistrationAgreements from "./RegistrationAgreement";
import RegistrationPayments from "./RegistrationPayments";
import SuccessModal from "./ui/SuccessModal";
import { useRegistrationContext } from "./hooks/useRegistrationContext";
// import { CreateUser } from "./Posts";
import { FormInput } from "../utils/schemas";
import { SubmitHandler } from "react-hook-form";
import { FormTypes, noValidateFormProp } from "../utils/modules";
import React, { useEffect, useState } from "react";
import axios, { isAxiosError } from "axios";
import { UserPostResponseTypes } from "../utils/modules";

interface modalTypes {
  success?: boolean;
  content?: string;
}

interface UserTypes extends FormTypes {
  createdAt: string;
  updatedAt: string;
}

interface ResponseTypes {
  jwt: string;
  user: UserTypes;
}

const authURL = "http://localhost:1337/api/auth";

const PageSwitch = () => {
  const { page, handleSubmit, reset, setNoValidateData, noValidateData } =
    useRegistrationContext();
  // const [showModal, setShowModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState<modalTypes>({});
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);

  function PostUser(endpoint: string, data: FormTypes) {
    axios
      .post<UserPostResponseTypes>(authURL + endpoint, data)
      .then((response) => {
        localStorage.setItem("jwt", response.data.jwt);
        setModalData({
          success: true,
          content: "Udało się pomyślnie zarejestrować!",
        });
        setIsSubmitSuccessful(true);
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
        }
      });
  }

  // nie wiem czy to dobry sposób ale wkładam w miejsce numeru pusty string aby wyczyści formularz
  useEffect(() => {
    if (isSubmitSuccessful) {
      // cleanUp all form data
      reset!({
        cardNameSname: [],
        cardNumber: "",
        email: "",
        expiryDate: "",
        password: "",
        securityCode: "",
      });

      setNoValidateData!({
        optInSubscription: false,
        password: "",
        email: "",
        paymentsOffer: 0,
        paymentsProcessing: "creditCard",
      });
    }
  }, [isSubmitSuccessful]);

  const payPalSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("payPal submit!");

    const cleanedData: FormTypes = {
      username: noValidateData?.email!,
      ...noValidateData!,
    };
    PostUser(`/local/register`, cleanedData);
  };

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    // const { optInSubscription, paymentsOffer, paymentsProcessing } =
    //   noValidateData!;

    const allData: FormTypes = {
      // password: data?.password,
      // email: data?.email,
      username: data?.email,
      cardName: data?.cardNameSname[0],
      cardSname: data?.cardNameSname[1],
      cardNumber: data?.cardNumber,
      expiryDate: data?.expiryDate,
      securityCode: data?.securityCode,
      ...noValidateData!,
      // optInSubscription: optInSubscription,
      // paymentsOffer: paymentsOffer,
      // paymentsProcessing: paymentsProcessing,
    };

    PostUser(`/local/register`, allData);
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
    <div className="form-wrapper">
      {modalData.content && (
        <SuccessModal
          title={modalData.success ? "Sukces" : "Uwaga"}
          content={modalData.content!}
        />
      )}
      <form
        onSubmit={
          noValidateData?.paymentsProcessing == "creditCard"
            ? handleSubmit!(onSubmit)
            : payPalSubmit
        }
      >
        {display[page]}
      </form>
    </div>
  );

  return content;
};

export default PageSwitch;
