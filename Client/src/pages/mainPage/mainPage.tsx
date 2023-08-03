import Navigation from "../../components/Navigation/nav"
import disney from '../../imgs/producers/disney.png'
import pixar from '../../imgs/producers/pix.png'
import marvel from '../../imgs/producers/marv.png'
import geo from '../../imgs/producers/geo.png'
import star from '../../imgs/producers/star.png'
import dc from '../../imgs/producers/dc.png'
import Producer from "./components/producer"
import CategoryRow from "../../components/categoryRow"
import {useState, useEffect} from 'react'
import { getFilms } from "../../utils/Gets"


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

    const [moviesData, setMoviesData] = useState<MovieDataType[] | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        getFilms().then((res) => {
            setMoviesData(prev => prev = res)
            console.log(res)
            setIsLoading(prev => prev = false)
        })
    },[])
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
                {!isLoading && moviesData && (
                    <CategoryRow title="Ostatnio popularne" moviesList={moviesData}/>
                )}

            </main>
        </div>
        </>
    )
}
export default MainPage