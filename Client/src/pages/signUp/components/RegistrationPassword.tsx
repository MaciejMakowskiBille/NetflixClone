import React, { useState } from "react";
import { useRegistrationContext } from "../../../pages/signUp/hooks/useRegistrationContext";
import Password from "../../../components/Input/Password";

function RegistrationPassword() {
  const { register, errors, setNoValidateData, nextPage } =
    useRegistrationContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    if (name == "password") {
      setNoValidateData!((prev) => ({
        ...prev,
        ["password"]: e.target.value,
      }));
    }
  };

  const [passwordShown, setPasswordShown] = useState<boolean>(false);

  const classNameText = errors?.password
    ? "wrapper__text-input error"
    : "wrapper__text-input";

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

        <Password
          passwordShown={passwordShown}
          setPasswordShown={setPasswordShown}
          handleChange={handleChange}
          register={register}
          className={classNameText}
          errors={errors}
        />

        <button
          className="form-button button-primary"
          onClick={() => nextPage!("password")}
        >
          Zaloguj
        </button>
      </div>
    </div>
  );
}

export default RegistrationPassword;
