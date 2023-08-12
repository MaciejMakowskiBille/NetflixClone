import React from "react";
import "../style/style.css";
import { useRegistrationContext } from "./hooks/useRegistrationContext";

function RegistrationEmail() {
  const { noValidateData, setPage, register, errors, setNoValidateData } =
    useRegistrationContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    if (name == "email") {
      setNoValidateData!((prev) => ({
        ...prev,
        ["email"]: e.target.value,
      }));
    } else if (name == "optInSubscription") {
      setNoValidateData!((prev) => ({
        ...prev,
        ["optInSubscription"]: !noValidateData!.optInSubscription,
      }));
    }
  };

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
        <div>
          <input
            className={
              errors?.email
                ? "wrapper__text-input error"
                : "wrapper__text-input"
            }
            type="email"
            placeholder="email"
            {...register!("email")}
            onChange={handleChange}
          />
          {errors?.email && (
            <p className="error-message">{errors.email?.message}</p>
          )}
        </div>
        <label className="wrapper__checkbox">
          <input
            type="checkbox"
            name="optInSubscription"
            checked={noValidateData!.optInSubscription}
            onChange={handleChange}
          ></input>
          <span className="checkbox-text">
            Zgadzam się na otrzymywanie specjalnych ofert i informacji
            dotyczących produktów FilmeX.
          </span>
        </label>
        <div className="card">
          <p>
            FilmeX będzie używał twoich danych do ulepszania twoich wyszukiwań i
            wysyłania informacji dotyczących FilmeX. Możesz w każdym momencie
            zmienić twoje ustwienia komunikacji. Klikając Kontynłuj
            potwierdzasz, że zaznajomiłeś się z naszą Polityką Prywatności.
          </p>
          <button
            type="button"
            onClick={() => {
              setPage!((prev) => prev + 1);
            }}
            className="button-primary"
          >
            Kontynułuj
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegistrationEmail;
