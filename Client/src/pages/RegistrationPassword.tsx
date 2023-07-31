import "../style/registrationPassword.css";

function RegistrationPassword() {
  return (
    <>
      <div className="black-background">
        <div className="wrapper">
          <div className="wrapper__header">
            <h4>Krok 2 z 4</h4>
            <h1>Wprowadź hasło</h1>
          </div>
          <p className="wrapper__text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, nam?
            Quidem odit neque repellendus quae porro adipisci obcaecati nostrum
            amet!
          </p>
          <input
            className="wrapper__text-input"
            type="text"
            placeholder="hasło"
          ></input>
          <button className="wrapper__btn">Zaloguj</button>
        </div>
      </div>
    </>
  );
}

export default RegistrationPassword;
