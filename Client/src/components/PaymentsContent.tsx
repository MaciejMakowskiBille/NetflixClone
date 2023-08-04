import paypal2 from "../imgs/icons/paypal2.svg";

export default function PaymentsContent({
  handleChange,
  activeContentIndex,
}: {
  handleChange?: React.ChangeEventHandler<HTMLInputElement>;
  activeContentIndex: number;
}) {
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
