// import { useState } from "react";
import { useState } from "react";
import PaymentsOffer from "../components/PaymentsOffer";
import "../style/style.css";
import PaymentsSwitch from "./PaymentsSwitch";

function RegistrationPayments() {
  const [offerIndex, setOfferIndex] = useState<number | undefined>();
  return (
    <>
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
              className={offerIndex === 0 ? "active" : ""}
              onClick={() => setOfferIndex(0)}
              text="Miesięcznie"
              cost="28.99zł"
            />
            <PaymentsOffer
              className={
                offerIndex === 1
                  ? "payments-offer--primary active"
                  : "payments-offer--primary"
              }
              onClick={() => setOfferIndex(1)}
              text="Rocznie"
              cost="289.99zł"
            />
          </div>

          <PaymentsSwitch />
        </div>
      </div>
    </>
  );
}

export default RegistrationPayments;
