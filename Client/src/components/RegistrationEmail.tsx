import "../style/style.css";
// import Card from "../components/Card";
// import TextBox from "../components/TextBox";
import Card from "../components/Card";
import { useContext, useEffect, useState } from "react";
import { useRegistrationContext } from "./hooks/useRegistrationContext";
import RegistrationContext from "./context/RegistrationContext";

function RegistrationEmail() {
  // const [checkedOffers, setCheckedOffers] = useState<boolean>(false);
  // const { data, handleChange, page, setPage } = useRegistrationContext();
  const { data, handleChange, handleClick } = useContext(RegistrationContext);

  return (
    <div className="black-background">
      <div className="wrapper">
        <div className="wrapper__header">
          <h4>Krok 1 z 4</h4>
          <h1>Wprowadź twój adres email</h1>
        </div>
        <p className="wrapper__text">
          Będziesz używał tego emailu i hasła do logowania się do towjego konta
          FilmeX aby oglądać twoje ulubione filmy i seriale.
        </p>

        <input
          className="wrapper__text-input"
          name="email"
          type="text"
          onChange={handleChange}
          placeholder="email"
        ></input>
        <label className="wrapper__checkbox">
          <input
            type="checkbox"
            name="optInSubscription"
            checked={data?.optInSubscription}
            onChange={handleChange}
          ></input>
          <span className="checkbox-text">
            Zgadzam się na otrzymywanie specjalnych ofert i informacji
            dotyczących produktów FilmeX.
          </span>
        </label>
        <Card>
          <button className="button-primary" onClick={handleClick}>
            Kontynułuj
          </button>
        </Card>
      </div>
    </div>
  );
}

export default RegistrationEmail;
