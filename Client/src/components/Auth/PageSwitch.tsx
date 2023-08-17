import RegistrationEmail from "./RegistrationEmail";
import RegistrationPassword from "./RegistrationPassword";
import RegistrationAgreements from "./RegistrationAgreement";
import RegistrationPayments from "./RegistrationPayments";
import SuccessModal from "../ui/SuccessModal";
import { useRegistrationContext } from "../hooks/useRegistrationContext";
import { FormInput } from "../../utils/schemas";
import { SubmitHandler } from "react-hook-form";
import { UserTypes } from "../../utils/modules";
import React, { useEffect, useState } from "react";
import axios, { isAxiosError } from "axios";
import { UserPostResponseTypes, paymentsTypes } from "../../utils/modules";
import { postPayment } from "./Post";
interface modalTypes {
  success?: boolean;
  content?: string;
}

// interface UserTypes extends UserTypes {
//   createdAt: string;
//   updatedAt: string;
// }

// interface ResponseTypes {
//   jwt: string;
//   user: UserTypes;
// }

const authURL = "http://localhost:3001/api/auth";

export const setAuthToken = (token: string) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else delete axios.defaults.headers.common["Authorization"];
};

const PageSwitch = () => {
  const { page, handleSubmit, reset, setNoValidateData, noValidateData } =
    useRegistrationContext();
  const [modalData, setModalData] = useState<modalTypes>({});
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);

  async function PostUser(
    endpoint: string,
    data: UserTypes
  ): Promise<void | UserPostResponseTypes> {
    return await axios
      .post(authURL + endpoint, data)
      .then((response) => {
        localStorage.setItem("jwt", response.data.jwt);
        setAuthToken(response.data.jwt);
        setModalData({
          success: true,
          content: "Udało się pomyślnie zarejestrować!",
        });
        setIsSubmitSuccessful(true);
        return response.data as UserPostResponseTypes;
      })
      .catch((err) => {
        if (isAxiosError(err)) {
          if (err.response?.status == 400) {
            setModalData({
              success: false,
              content:
                "Użytkownik o takim emailu już istnieje.\nSpróbuj ponownie!",
            });
          }
        } else {
          setModalData({
            success: false,
            content: "Nieoczekiwany błąd. \nSpróbuj ponownie!",
          });
        }
        console.log(err);
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

  const payPalSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("payPal submit!");

    const cleanedData: UserTypes = {
      username: noValidateData?.email!,
      password: noValidateData?.password!,
      email: noValidateData?.email!,
      optInSubscription: noValidateData?.optInSubscription!,
    };

    const userResponse = await PostUser(`/local/register`, cleanedData);
    if (userResponse) {
      console.log("utworzono użytkownaika: ", userResponse);
      const paymentsData: paymentsTypes = {
        data: {
          paymentsOffer: noValidateData?.paymentsOffer!,
          paymentsProcessing: noValidateData?.paymentsProcessing!,
          user: userResponse.user.id!,
        },
      };
      console.log("id użytkownika: ", userResponse.user.id);
      const response = await postPayment(paymentsData);
      if (response) {
        console.log(response);
        console.log("utworzono profil płatności!");
      }
    }
  };

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const userData: UserTypes = {
      username: data?.email,
      password: noValidateData?.password!,
      email: noValidateData?.email!,
      optInSubscription: noValidateData?.optInSubscription,
    };

    const userResponse = await PostUser(`/local/register`, userData);
    if (userResponse) {
      console.log("utworzono użytkownika", userResponse.user);
      const paymentsData: paymentsTypes = {
        data: {
          cardName: data.cardNameSname[0]!,
          cardSname: data.cardNameSname[1]!,
          cardNumber: data.cardNumber!,
          expiryDate: data.expiryDate!,
          securityCode: data.securityCode!,
          paymentsProcessing: noValidateData?.paymentsProcessing!,
          paymentsOffer: noValidateData?.paymentsOffer!,
          user: userResponse.user.id!,
        },
      };
      console.log("id użytkownika: ", userResponse.user.id);
      const response = await postPayment(paymentsData);
      if (response) {
        console.log(response);
        console.log("utworzono profil płatności!");
      }
    }
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
          title={modalData.success ? "Sukces" : "Upss!"}
          buttonText={modalData.success ? "Zaloguj się" : "Okey"}
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
