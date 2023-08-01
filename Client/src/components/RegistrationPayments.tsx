import PaymentsOffer from "../components/PaymentsOffer";
import "../style/main.css";

function RegistrationPayments() {
  return (
    <>
      <div className="black-background">
        <div className="wrapper">
          <div className="wrapper__header">
            <h4>Krok 3 z 4</h4>
            <h1>Zgoda na subskrypcję</h1>
          </div>
          <p className="wrapper__text-box">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequuntur voluptas officia laboriosam ullam facilis quae quos aut
          </p>
          <PaymentsOffer text="Miesięcznie" cost="28.99zł" />
          <PaymentsOffer text="Rocznie" cost="289.99zł" />
          <button className="wrapper__btn">Zgadzam się</button>
        </div>
      </div>
    </>
  );
}

export default RegistrationPayments;
