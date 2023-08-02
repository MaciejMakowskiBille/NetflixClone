import { useState } from "react";
import credit_card from "../imgs/icons/credit-card.svg";
import paypal from "../imgs/icons/paypal.svg";
import Switch from "./Switch";
import PaymentsContent from "./PaymentsContent";

export default function PaymentsSwitch() {
  const [activeContentIndex, setActiveContentIndex] = useState<number>(0);
  return (
    <main>
      <nav className="services">
        <Switch
          img={credit_card}
          name="Karta kredytowa"
          key={credit_card}
          onClick={() => setActiveContentIndex(0)}
          className={activeContentIndex === 0 ? "item--active" : ""}
        />
        <Switch
          img={paypal}
          name="PayPal"
          key={credit_card}
          onClick={() => setActiveContentIndex(1)}
          className={activeContentIndex === 1 ? "item--active" : ""}
        />
      </nav>
      <PaymentsContent activeContentIndex={activeContentIndex} />
    </main>
  );
}
