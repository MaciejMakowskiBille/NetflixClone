import { useNavigate } from "react-router-dom"

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="home">
        <main>
          <div className='homeHeader'>
            <div className='title'>
                Filme<span>x</span>
            </div>
            <button className='button-primary' onClick={() => navigate('/signIn')}>Zaloguj się</button>
          </div>
          <div className='centeredContent'>
            <h1>
                Filmy seriale i wiele więcej bez ograniczeń
            </h1>
            <h3>
                Oglądaj wszędzie. Anuluj w każdej chwili*
            </h3>
            </div>
            <div className='centeredContent'>
              <div className='darkinfo'>
                  Wprowadź swój adres email aby rozpocząć swoją przygodę.
              </div>
              <div className='homeForm'>
                  <input type='text' placeholder='Email' className='inputEmailHomge input-background'/>
                  <button type='submit' className='button-primary' onClick={() => navigate('/signUp')}>Rozpocznij</button>
              </div>
            </div>

        </main>
      </div>
    </>
  )
}

export default Home
