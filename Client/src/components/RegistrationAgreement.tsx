import { useRegistrationContext } from "./hooks/useRegistrationContext";

function RegistrationAgreements() {
  const { handleClick } = useRegistrationContext();

  return (
    <div className="black-background">
      <div className="wrapper">
        <div className="wrapper__header">
          <h4>Krok 3 z 4</h4>
          <h1>Zgoda na subskrypcję</h1>
        </div>

        <p className="card card--scroll">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur
          voluptas officia laboriosam ullam facilis quae quos aut laborum.
          Exercitationem libero optio nam voluptas recusandae placeat quia totam
          perspiciatis expedita facere, molestias necessitatibus debitis velit
          saepe? Repellendus tempora, veniam a sed dicta quam voluptas
          consectetur alias fugit deleniti culpa, qui at! Repellendus tempora,
          veniam a sed dicta quam voluptas consectetur alias fugit deleniti
          culpa, qui at! Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Consequuntur voluptas officia laboriosam ullam facilis quae quos
          aut laborum. Exercitationem libero optio nam voluptas recusandae
          placeat quia totam perspiciatis expedita facere, molestias
          necessitatibus debitis velit saepe? Repellendus tempora, veniam a sed
          dicta quam voluptas consectetur alias fugit deleniti culpa, qui at!
          Repellendus tempora, veniam a sed dicta quam voluptas consectetur
          alias fugit deleniti culpa, qui at!
        </p>
        <p className="wrapper__text--small">
          Klikając "Zgadzam się" wyrażasz Zgodę na Subskrybcję. Aby ją zapisać i
          wydrukowac twoją Zgodę subskrypcji proszę użyj twojej przeglądarki
        </p>
        <button
          className="button-primary"
          name="agreement"
          onClick={handleClick}
        >
          Zgadzam się
        </button>
      </div>
    </div>
  );
}

export default RegistrationAgreements;
