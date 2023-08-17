import { useRegistrationContext } from "../hooks/useRegistrationContext";
import { postUser, postPayment } from "./registrationHelpers";
import { SubmitHandler } from "react-hook-form";
import React, { useState, useEffect } from "react";

import RegistrationEmail from "./RegistrationEmail";
import RegistrationPassword from "./RegistrationPassword";
import RegistrationAgreements from "./RegistrationAgreement";
import RegistrationPayments from "./RegistrationPayments";
import SuccessModal from "../ui/SuccessModal";

import { FormInput } from "../../utils/schemas";
import {
  paymentsTypes,
  displayArray,
  UserTypes,
  modalTypes,
} from "../../utils/modules";

const display: displayArray = {
  0: <RegistrationEmail />,
  1: <RegistrationPassword />,
  2: <RegistrationAgreements />,
  3: <RegistrationPayments />,
};

const RegistrationForm = () => {
  const [modalData, setModalData] = useState<modalTypes>({});
  //   const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const { noValidateData, page, handleSubmit, reset, setNoValidateData } =
    useRegistrationContext();

  // Submit Form function
  const submitForm = async (
    endpoint: string,
    data: UserTypes,
    formData?: FormInput
  ) => {
    try {
      const userResponse = await postUser(endpoint, data);
      if (userResponse) {
        console.log("utworzono użytkownaika: ", userResponse);

        setModalData({
          success: true,
          content: "Udało się pomyślnie zarejestrować!",
        });

        const paymentsData: paymentsTypes[] = [
          {
            data: {
              paymentsOffer: noValidateData?.paymentsOffer!,
              paymentsProcessing: noValidateData?.paymentsProcessing!,
              user: userResponse.user.id!,
            },
          },
          {
            data: {
              cardName: formData?.cardNameSname[0]!,
              cardSname: formData?.cardNameSname[1]!,
              cardNumber: formData?.cardNumber!,
              expiryDate: formData?.expiryDate!,
              securityCode: formData?.securityCode!,
              paymentsProcessing: noValidateData?.paymentsProcessing!,
              paymentsOffer: noValidateData?.paymentsOffer!,
              user: userResponse.user.id!,
            },
          },
        ];

        console.log("id użytkownika: ", userResponse.user.id);
        const paymentsDataIndex = formData ? 1 : 0;
        const response = await postPayment(
          "/payments",
          paymentsData[paymentsDataIndex]
        );
        if (response) {
          console.log(response);
          console.log("utworzono profil płatności!");
        }
      }
    } catch (err) {
      setModalData({ success: false, content: err.message });
      console.log(err);
    }
  };

  // payPal Submit
  const payPalSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("payPal submit!");

    const cleanedData: UserTypes = {
      username: noValidateData?.email!,
      password: noValidateData?.password!,
      email: noValidateData?.email!,
      optInSubscription: noValidateData?.optInSubscription!,
    };

    await submitForm(`/local/register`, cleanedData);
  };

  // creditCard submit
  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const userData: UserTypes = {
      username: data?.email,
      password: noValidateData?.password!,
      email: noValidateData?.email!,
      optInSubscription: noValidateData?.optInSubscription,
    };

    await submitForm(`/local/register`, userData, data);
  };

  const cleanUpData = () => {
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
  };

  useEffect(() => {
    if (modalData.success) {
      // cleanUp all form data
      cleanUpData;
    }
  }, [modalData]);

  return (
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
};

export default RegistrationForm;
