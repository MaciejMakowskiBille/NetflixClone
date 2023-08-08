import "../style/style.css";
import { useRegistrationContext } from "./hooks/useRegistrationContext";

function RegistrationEmail() {
  const { data, handleChange, handleClick, register, errors } =
    useRegistrationContext();

  // useEffect(() => {
  //
  // }, [watch]);
  // console.log(watch!("email"));
  // useEffect(() => {
  //   watch!((_, { name }) => {
  //     console.log("name", name);
  //     ()trigger!("email");
  //   });
  // }, [watch, trigger]);

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
            type="text"
            {...register!("email")}
            name="email"
            // onBlur={() => handleClick!("email")}
            // pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
            onChange={handleChange}
            placeholder="email"
          />
          {errors?.email && (
            <p className="error-message">{errors.email?.message}</p>
          )}
        </div>
        <label className="wrapper__checkbox">
          <input
            type="checkbox"
            name="optInSubscription"
            checked={data!.optInSubscription}
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
            onClick={() => handleClick!("email")}
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
