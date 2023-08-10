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
import { getCategories, getFilms, getSeries } from "../../utils/Gets"
import Slider from "../../components/Slider/slider"


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
    const [seriesData, setSeriesData] = useState<SeriesDataType[] | null>(null)
    const [combinedData, setCombinedData] = useState<CombinedDataType>([])
    const [categories, setCategories] = useState<Category[] | null>(null) 
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getSeries().then((res) => {
            setSeriesData(prev => prev = res)
            setIsLoading(prev => prev = false)
        }).catch((error) => {
            setIsLoading(true)
            console.log(error)
        })

        getFilms().then((res) => {
            setMoviesData(prev => prev = res)
            setIsLoading(prev => prev = false)
        }).catch((error) => {
            setIsLoading(true)
            console.log(error)
        })

        getCategories().then((res) => {
            setCategories(prev => prev = res)
            setIsLoading(prev => prev = false)
        }).catch((error) => {
            setIsLoading(true)
            console.log(error)
        })
    },[])
    useEffect(() => {
        if (moviesData && seriesData) {
            setCombinedData([...moviesData, ...seriesData]);
          } else if (moviesData) {
            setCombinedData(moviesData);
          } else if (seriesData) {
            setCombinedData(seriesData);
          }
    },[moviesData, seriesData])
    return(
        <>
        <div className="appBackground">
            <Navigation/>
            <main>
                <Slider/>
                <div className="producersList">
                    {producerList.map(prod => {
                        return(
                            <Producer key={prod.name} name={prod.name} image={prod.image}/>
                        )
                    })}
                </div>
                {!isLoading && moviesData && categories && (
                    categories.map(category => {
                        return(
                            <CategoryRow key={category.id} title={category.name} moviesList={combinedData}/>
                        )
                    })
                )}

            </main>
        </div>
        </>
    )
}
export default MainPage