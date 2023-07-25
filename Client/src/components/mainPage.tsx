import Navigation from "./nav"
import disney from '../imgs/producers/disney.png'
import pixar from '../imgs/producers/pix.png'
import marvel from '../imgs/producers/marv.png'
import geo from '../imgs/producers/geo.png'
import star from '../imgs/producers/star.png'
import dc from '../imgs/producers/dc.png'
import Producer from "./producer"

const producerList = [
    {
        name:'Disney',
        image:disney
    },
    {
        name:'Pixar',
        image:pixar
    },
    {
        name:'Marvel',
        image:marvel
    },
    {
        name:'National Geographic',
        image:geo
    },
    {
        name:'Star Wars',
        image:star
    },
    {
        name:'DC',
        image:dc
    }
]

const MainPage = () => {


    return(
        <>
        <div className="appBackground">
            <Navigation/>
            <main>
                <div className="slider">
                    <div className="slide">
                    </div>
                </div>
                <div className="producersList">
                    {producerList.map(prod => {
                        return(
                            <Producer key={prod.name} name={prod.name} image={prod.image}/>
                        )
                    })}
                </div>
                <div className="category">
                    <div className="title">
                        Ostatnio popularne
                    </div>
                </div>

            </main>
        </div>
        </>
    )
}
export default MainPage