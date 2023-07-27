import "../css/registration.css";
// import Card from "../components/Card";

function RegistrationEmail() {
  return (
    <>
      <div className="black-background">
        <div className="wrapper">
          <h4>Krok 1 z 4</h4>
          <h1 className="wrapper__header">Wprowadź Twój Adres Email</h1>

          <input
            className="wrapper__text-input"
            type="text"
            placeholder="hasło"
          ></input>
          <button className="card__btn">Kontynułuj</button>
        </div>
      </div>
    </>
  );
}

export default RegistrationEmail;
