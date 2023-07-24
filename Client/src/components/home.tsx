import '../style/style.css'
function Home() {

  return (
    <>
      <div className="home">
        <main>
          <nav>
            <div className='title'>
                Filme<text>x</text>
            </div>
            <button className='button-primary'>Zaloguj się</button>
          </nav>
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
                  <input type='text' placeholder='Email' className='inputEmailHomge'/>
                  <button type='submit' className='button-primary'>Rozpocznij</button>
              </div>
            </div>

        </main>
      </div>
    </>
  )
}

export default Home
