import { useEffect, useState } from "react";
import Navigation from "../../components/Navigation/nav";
import { getProducers } from "../../utils/Gets";
import Producer from "../../components/Producer/producer";

const ProducersPage = () => {
  const [producers, setProducers] = useState<Producer[] | null>(null);

  useEffect(() => {
    getProducers()
      .then((res) => {
        setProducers(res);
      })
      .catch(() => {
        setProducers(null);
      });
  }, []);

  return (
    <>
      <div className="appBackground">
        <Navigation />
        <main>
          <section className="producersPage">
            {producers &&
              producers.map((producer) => {
                return (
                  <Producer
                    key={producer.id}
                    name={producer.name}
                    image={producer.image}
                  />
                );
              })}
          </section>
        </main>
      </div>
    </>
  );
};

export default ProducersPage;
