import React from "react";
import { useRegistrationContext } from "../hooks/useRegistrationContext";

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
        <div>
          <input
            className={
              errors?.password
                ? "wrapper__text-input error"
                : "wrapper__text-input"
            }
            type="password"
            {...register!("password")}
            name="password"
            placeholder="hasło"
            onChange={handleChange}
          />
          {errors?.password && (
            <p className="error-message">{errors.password?.message}</p>
          )}
        </div>
        <button
          className="button-primary"
          onClick={() => nextPage!("password")}
        >
          Zaloguj
        </button>
      </div>
    </div>
  );
}

export default RegistrationPassword;
