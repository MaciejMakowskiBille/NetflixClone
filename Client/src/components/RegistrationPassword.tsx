// import "../style/registrationPassword.css";
// import useRe

import { useRegistrationContext } from "./hooks/useRegistrationContext";

function RegistrationPassword() {
  // const {setPage} =
  const { handleClick, handleChange } = useRegistrationContext();
  return (
    <div className="black-background">
      <div className="wrapper">
        <div className="wrapper__header">
          <h4>Krok 2 z 4</h4>
          <h1>Wprowadź hasło</h1>
        </div>
        <p className="wrapper__text">
          Będziesz używał tego emailu i hasła do logowania się do towjego konta
          FilmeX aby oglądać twoje ulubione filmy i seriale.
        </p>

        <input
          className="wrapper__text-input"
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="hasło"
        ></input>
        <button className="button-primary" onClick={handleClick}>
          Zaloguj
        </button>
      </div>
    </div>
  );
}

export default RegistrationPassword;