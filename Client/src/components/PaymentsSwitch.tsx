import { useState } from "react";
import credit_card from "../imgs/icons/credit-card.svg";
import paypal from "../imgs/icons/paypal.svg";
import Switch from "./Switch";

export default function PaymentsSwitch() {
  const [activeContentIndex, setActiveContentIndex] = useState<number>(0);

  function returnContent() {
    if (activeContentIndex === 0) {
      return (
        <div className="content">
          <p>IMIE I NAZWISKO NA KARCIE</p>
          <input className="wrapper__text-input" type="text" />
          <p>NUMER KARTY</p>
          <input className="wrapper__text-input" type="text" />
          <div className="inputs">
            <div className="input">
              <p>DATA WAŻNOŚCI</p>
              <input
                className="wrapper__text-input wrapper__text-input--smaller"
                type="text"
                placeholder="MM/RR"
              />
            </div>
            <div className="input">
              <p>KOD BEZPIECZEŃSTWA</p>
              <input
                className="wrapper__text-input wrapper__text-input--smaller"
                type="text"
                placeholder="CVV"
              />
            </div>
          </div>
          <p className="content__main-text">
            Kliknięcie przycisku „Zapłać i subskrybuj” oznacza zgodę na
            natychmiastową aktywację subskrypcji, przy czym możesz odstąpić od
            umowy i otrzymać zwrot środków w ciągu pierwszych 14 dni, chyba że
            rozpoczniesz korzystanie z treści cyfrowych w serwisie FilmeX. W
            przypadku subskrypcji miesięcznej będziemy pobierać opłatę
            miesięczną w wysokości 28,99 zł w sposób cykliczny. W przypadku
            subskrypcji rocznej pobierzemy opłatę roczną w wysokości 289,90 zł
            na początku okresu rozliczeniowego, po którego upływie będziemy
            automatycznie pobierać opłatę miesięczną w wysokości 28,99 zł w
            sposób cykliczny. Subskrypcję możesz anulować w dowolnym momencie,
            ze skutkiem na koniec okresu rozliczeniowego. Nie zwracamy środków
            ani nie udzielamy rekompensaty za częściowo wykorzystane miesiące
            lub lata.
          </p>
        </div>
      );
    } else {
      return <div className="content"></div>;
    }
  }

  return (
    <main>
      <nav className="services">
        <Switch
          img={credit_card}
          name="Karta kredytowa"
          key={credit_card}
          onClick={() => setActiveContentIndex(0)}
          className={activeContentIndex === 0 ? "item--active" : ""}
        />
        <Switch
          img={paypal}
          name="PayPal"
          key={credit_card}
          onClick={() => setActiveContentIndex(1)}
          className={activeContentIndex === 1 ? "item--active" : ""}
        />
      </nav>
      {returnContent()}
    </main>
  );
}
