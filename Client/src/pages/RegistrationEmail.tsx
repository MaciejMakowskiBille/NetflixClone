import "../css/registration.css";
import Card from "../components/Card";

function RegistrationEmail() {
  return (
    <>
      <div className="black-background">
        <div className="wrapper">
          <h4>Krok 1 z 4</h4>
          <h1 className="wrapper__header">Wprowadź Twój Adres Email</h1>
          <p className="wrapper__text">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident,
            laborum!Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Provident, laborum!
          </p>
          <input
            className="wrapper__text-input"
            type="text"
            placeholder="email"
          ></input>
          {/* <input type="checkbox"></input> */}
          <Card></Card>
        </div>
      </div>
    </>
  );
}

export default RegistrationEmail;
