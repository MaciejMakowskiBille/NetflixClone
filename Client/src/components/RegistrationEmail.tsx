import "../style/style.css";
// import Card from "../components/Card";
// import TextBox from "../components/TextBox";
import Card from "../components/Card";
import { useEffect, useState } from "react";

function RegistrationEmail() {
  const [checkedOffers, setCheckedOffers] = useState(false);

  useEffect(() => {
    console.log(checkedOffers);
  }, [checkedOffers]);

  return (
    <form>
      <div className="black-background">
        <div className="wrapper">
          <div className="wrapper__header">
            <h4>Krok 1 z 4</h4>
            <h1>Wprowadź twój adres email</h1>
          </div>
          <p className="wrapper__text">
            Będziesz używał tego emailu i hasła do logowania się do towjego
            konta FilmeX aby oglądać twoje ulubione filmy i seriale.
          </p>
          <input
            className="wrapper__text-input"
            type="text"
            placeholder="email"
          ></input>
          <label className="wrapper__checkbox">
            <input
              type="checkbox"
              checked={checkedOffers}
              onClick={() => setCheckedOffers(!checkedOffers)}
            ></input>
            <span className="checkbox-text">
              Zgadzam się na otrzymywanie specjalnych ofert i informacji
              dotyczących produktów FilmeX.
            </span>
          </label>
          <Card />
        </div>
      </div>
    </form>
  );
}

export default RegistrationEmail;
