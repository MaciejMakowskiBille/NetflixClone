// import "../style/registrationPassword.css";
// import useRe

function RegistrationPassword() {
  // const {setPage} =

  return (
    <form>
      <div className="black-background">
        <div className="wrapper">
          <div className="wrapper__header">
            <h4>Krok 2 z 4</h4>
            <h1>Wprowadź hasło</h1>
          </div>
          <p className="wrapper__text">
            Będziesz używał tego emailu i hasła do logowania się do towjego
            konta FilmeX aby oglądać twoje ulubione filmy i seriale.
          </p>
          <input
            className="wrapper__text-input"
            type="password"
            placeholder="hasło"
          ></input>
          <button className="button-primary">Zaloguj</button>
        </div>
      </div>
    </form>
  );
}

export default RegistrationPassword;
