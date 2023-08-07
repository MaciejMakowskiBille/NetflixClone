// import { useEffect } from "react";
import paypal2 from "../imgs/icons/paypal2.svg";
import { useRegistrationContext } from "./hooks/useRegistrationContext";

export default function PaymentsContent({
  handleChange,
  activeContentIndex,
}: {
  handleChange?: React.ChangeEventHandler<HTMLInputElement>;
  activeContentIndex: number;
}) {
  // const {register, trigger, errors} = useRegistrationContext();
  // const handlePress = (e) => {
  //   // var isMonthEntered = monthRegex.exec(e.target.value);
  //

  // }

  // const isMonthEntered = true;

  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    let key = e.key;

    let input = e.target as HTMLFormElement;
    const monthRegex = /^\d\d$/;
    const isMonthEntered = monthRegex.test(input.value);

    let regex = /\d/;
    // if (!regex.test(key) && key !== "Backspace" && key !== "Delete") {
    //   e.preventDefault();
    // }
    if (regex.test(key)) {
      input.value = input.value + key;
    } else {
      e.preventDefault();
    }
    // if (isMonthEntered) {
    //   input.value = input.value + "/";
    // }
  }

  const removeSlash = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let key = e.key;
    const monthAndSlashRegex = /^\d\d\/$/;

    let input = e.target as HTMLFormElement;

    var isMonthAndSlashEntered = monthAndSlashRegex.test(input.value);
    if (isMonthAndSlashEntered && key === "Backspace") {
      input.value = input.value.slice(0, 2);
    }
  };

  // const cardNumberKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   let input = e.target as HTMLFormElement;
  //   // var onePartEntered = onePartRegex.test(input.value);
  //   // console.log();
  //   if (input.value.length % 4 == 0) {
  //     input.value = input.value + "-";
  //   }
  // };

  const blockInitials = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let key = e.key;

    // let input = e.target as HTMLFormElement;
    let regex = /\d/;
    if (!regex.test(key) && key !== "Backspace" && key !== "Delete") {
      e.preventDefault();
    }
  };

  if (activeContentIndex === 0) {
    return (
      <div className="content">
        <div className="input">
          <p>IMIE I NAZWISKO NA KARCIE</p>
          <input
            className="wrapper__text-input"
            type="text"
            name="cardNameSname"
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <p>NUMER KARTY</p>
          <input
            className="wrapper__text-input"
            type="text"
            maxLength={16}
            // onKeyUp={cardNumberKeyPress}
            onChange={handleChange}
            name="cardNumber"
          />
        </div>
        <div className="inputs">
          <div className="input">
            <p>DATA WAŻNOŚCI</p>
            <input
              className="wrapper__text-input wrapper__text-input--smaller"
              type="text"
              name="expiryDate"
              onKeyUp={handleKeyPress}
              onKeyDown={removeSlash}
              // onKeyUp={handleBackSpace}
              // pattern="/^\d\d\/\d\d$/"
              maxLength={5}
              onChange={handleChange}
              placeholder="MM/RR"
            />
          </div>
          <div className="input">
            <p>KOD BEZPIECZEŃSTWA</p>
            <input
              className="wrapper__text-input wrapper__text-input--smaller"
              type="text"
              name="securityCode"
              maxLength={3}
              // onKeyUp={blockInitials}
              onChange={handleChange}
              placeholder="CVV"
            />
          </div>
        </div>
        <p className="content__main-text">
          Kliknięcie przycisku „Zapłać i subskrybuj” oznacza zgodę na
          natychmiastową aktywację subskrypcji, przy czym możesz odstąpić od
          umowy i otrzymać zwrot środków w ciągu pierwszych 14 dni, chyba że
          rozpoczniesz korzystanie z treści cyfrowych w serwisie FilmeX. W
          przypadku subskrypcji miesięcznej będziemy pobierać opłatę miesięczną
          w wysokości 28,99 zł w sposób cykliczny. W przypadku subskrypcji
          rocznej pobierzemy opłatę roczną w wysokości 289,90 zł na początku
          okresu rozliczeniowego, po którego upływie będziemy automatycznie
          pobierać opłatę miesięczną w wysokości 28,99 zł w sposób cykliczny.
          Subskrypcję możesz anulować w dowolnym momencie, ze skutkiem na koniec
          okresu rozliczeniowego. Nie zwracamy środków ani nie udzielamy
          rekompensaty za częściowo wykorzystane miesiące lub lata.
        </p>

        <button type="submit" className="button-primary">
          Zgadzam się
        </button>
      </div>
    );
  } else {
    return (
      <div className="content">
        <p className="text">
          Aby sfinalizować rejestrację, kliknij przycisk Zapłać z PayPal i
          zaloguj się do serwisu PayPal przy użyciu swojego adresu e-mail i
          hasła.
        </p>
        <p className="content__main-text">
          Kliknięcie przycisku „Zapłać i subskrybuj” oznacza zgodę na
          natychmiastową aktywację subskrypcji, przy czym możesz odstąpić od
          umowy i otrzymać zwrot środków w ciągu pierwszych 14 dni, chyba że
          rozpoczniesz korzystanie z treści cyfrowych w serwisie FilmeX. W
          przypadku subskrypcji miesięcznej będziemy pobierać opłatę miesięczną
          w wysokości 28,99 zł w sposób cykliczny. W przypadku subskrypcji
          rocznej pobierzemy opłatę roczną w wysokości 289,90 zł na początku
          okresu rozliczeniowego, po którego upływie będziemy automatycznie
          pobierać opłatę miesięczną w wysokości 28,99 zł w sposób cykliczny.
          Subskrypcję możesz anulować w dowolnym momencie, ze skutkiem na koniec
          okresu rozliczeniowego. Nie zwracamy środków ani nie udzielamy
          rekompensaty za częściowo wykorzystane miesiące lub lata.
        </p>
        <button type="submit" className="button-primary button--paypal">
          <p className="button-primary__text">ZAPŁAĆ Z</p>
          <img src={paypal2} alt="" className="paypal-full" />
        </button>
      </div>
    );
  }
}
