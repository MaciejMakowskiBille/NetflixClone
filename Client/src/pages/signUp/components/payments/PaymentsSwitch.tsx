import credit_card from "../../../../imgs/icons/credit-card.svg";
import paypal from "../../../../imgs/icons/paypal.svg";
import Switch from "./Switch";

export default function PaymentsSwitch({
  children,
  activeIndex,
  setActiveIndex,
}: {
  children: React.ReactNode;
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div>
      <div className="services">
        <Switch
          img={credit_card}
          name="Karta kredytowa"
          key={credit_card}
          onClick={() => setActiveIndex(0)}
          className={activeIndex === 0 ? "item--active" : ""}
        />
        <Switch
          img={paypal}
          name="PayPal"
          key={paypal}
          onClick={() => setActiveIndex(1)}
          className={activeIndex === 1 ? "item--active" : ""}
        />
      </div>
      {children}
    </div>
  );
}
