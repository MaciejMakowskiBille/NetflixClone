import "../style/style.css";
import { useRegistrationContext } from "./hooks/useRegistrationContext";
import { schema } from "./context/RegistrationContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
function RegistrationEmail() {
  const { data, handleChange, handleClick } = useRegistrationContext();
  const { register } = useForm({ resolver: zodResolver(schema) });

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
          type="text"
          {...register("email")}
          name="email"
          onChange={handleChange}
          placeholder="email"
        ></input>
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
          <button type="submit" className="button-primary">
            Kontynułuj
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegistrationEmail;
