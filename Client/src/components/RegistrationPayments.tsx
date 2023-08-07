// import { useState } from "react";
import { useEffect, useState } from "react";
import PaymentsOffer from "../components/PaymentsOffer";
import "../style/style.css";
import PaymentsSwitch from "./PaymentsSwitch";
import PaymentsContent from "./PaymentsContent";
import { useRegistrationContext } from "./hooks/useRegistrationContext";

function RegistrationPayments() {
  const [activeContentIndex, setActiveContentIndex] = useState<number>(0);
  const { setData, data, handleChange } = useRegistrationContext();

  useEffect(() => {
    const processingValue = activeContentIndex === 0 ? "creditCard" : "payPal";
    setData!((prev) => ({
      ...prev,
      ["paymentsProcessing"]: processingValue,
    }));
  }, [activeContentIndex]);

  return (
    <div className="black-background">
      <div className="wrapper">
        <div className="wrapper__header">
          <h4>Krok 4 z 4</h4>
          <h1>Zacznij oglądać już dziś</h1>
        </div>
        <p className="wrapper__text-box">
          Możesz anulować w dowolnym momencie, ze skutkiem na koniec okresu
          rozliczeniowego.
        </p>

        <div className="options">
          <PaymentsOffer
            className={data!.paymentsOffer === 0 ? "active" : ""}
            onClick={() => {
              setData!((prev) => ({
                ...prev,
                ["paymentsOffer"]: 0,
              }));
            }}
            text="Miesięcznie"
            cost="28.99zł"
          />
          <PaymentsOffer
            className={
              data!.paymentsOffer === 1
                ? "payments-offer--primary active"
                : "payments-offer--primary"
            }
            onClick={() => {
              setData!((prev) => ({
                ...prev,
                ["paymentsOffer"]: 1,
              }));
            }}
            text="Rocznie"
            cost="289.99zł"
          />
        </div>

        <PaymentsSwitch
          activeIndex={activeContentIndex}
          setActiveIndex={setActiveContentIndex}
        >
          <PaymentsContent
            activeContentIndex={activeContentIndex}
            handleChange={handleChange}
          />
        </PaymentsSwitch>
      </div>
    </div>
  );
}

export default RegistrationPayments;
