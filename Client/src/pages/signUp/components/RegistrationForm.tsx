import { useRegistrationContext } from "../hooks/useRegistrationContext";
import { postUser } from "../../../utils/Posts";
import { SubmitHandler } from "react-hook-form";
import React, { useState, useEffect } from "react";
import RegistrationEmail from "./RegistrationEmail";
import RegistrationPassword from "./RegistrationPassword";
import RegistrationAgreements from "./RegistrationAgreement";
import RegistrationPayments from "./payments/RegistrationPayments";
import Modal from "../../../components/modal/Modal";
import { DisplayedPagesObjectType } from "../../../types/propsType";
import { cleanUserData } from "../../../utils/helpers";
import { FormInput } from "../../../types/registrationTypes";
import {
  paymentsTypes,
  displayedPagesObjectTypes,
  UserTypes,
  modalTypes,
  profileTypes,
} from "../../../types/registrationTypes";
import { useSignedInContext } from "../../../providers/signedInProvider";

const display: DisplayedPagesObjectType = {
  0: <RegistrationEmail />,
  1: <RegistrationPassword />,
  2: <RegistrationAgreements />,
  3: <RegistrationPayments />,
};

const RegistrationForm = () => {
  const [modalData, setModalData] = useState<modalTypes>({});
  const { noValidateData, page, handleSubmit, reset, setNoValidateData } =
    useRegistrationContext();
  const signedInContext = useSignedInContext();
  // Submit Form function
  const submitForm = async (data: noValidateFormProp, formData?: FormInput) => {
    const cleanedData = cleanUserData(data, formData);
    try {
      const userResponse = await postUser(cleanedData);
      console.log("udało się:", userResponse);
      if (userResponse) {
        setModalData({
          success: true,
          content: "Udało się pomyślnie zarejestrować!",
        });
      }
    } catch (err) {
      if (err instanceof Error) {
        setModalData({ success: false, content: err.message });
      }
      console.log("error: ", err);
    }
  };

  // payPal Submit
  const payPalSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitForm(noValidateData!);
  };

  // creditCard submit
  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    await submitForm(noValidateData!, data);
  };

  // cleanUp all form data
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
      signedInContext.setIsSignedIn(true);
      cleanUpData;
    }
  }, [modalData]);

  return (
    <div className="form-wrapper">
      {modalData.content && (
        <Modal
          title={modalData.success ? "Sukces" : "Upss!"}
          buttonText={modalData.success ? "Przejdź do serwisu" : "Zamknij"}
          closeModal={() => setModalData({})}
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
