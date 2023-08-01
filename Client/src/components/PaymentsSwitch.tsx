import credit_card from "../imgs/icons/credit-card.svg";
import paypal from "../imgs/icons/paypal.svg";

export default function PaymentsSwitch({
  changeState,
}: {
  changeState: () => void;
}) {
  return (
    <nav className="services">
      <div className="item item--active" onClick={changeState}>
        <img className="credit_card" src={credit_card} alt="creditcart" />
        <p>Karta kredytowa</p>
      </div>
      <div className="item" onClick={changeState}>
        <img className="paypal" src={paypal} alt="paypal" />
        <p>PayPal</p>
      </div>
    </nav>
  );
}
