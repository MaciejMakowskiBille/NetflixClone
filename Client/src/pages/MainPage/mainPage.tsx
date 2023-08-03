import Navigation from "../../components/Navigation/nav"
import disney from '../../imgs/producers/disney.png'
import pixar from '../../imgs/producers/pix.png'
import marvel from '../../imgs/producers/marv.png'
import geo from '../../imgs/producers/geo.png'
import star from '../../imgs/producers/star.png'
import dc from '../../imgs/producers/dc.png'
import Producer from "./components/producer"
import CategoryRow from "../../components/categoryRow"
import small from '../../imgs/testTile/mini.png'
import hovered from '../../imgs/testTile/hover.png'
import logo from '../../imgs/testTile/logo.png'
import { getFilms } from "../../utils/Gets"
import { FilmListType } from "../../types/mainPage"

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

const list:FilmListType = [
    {
        title:"The Walking Dead",
        categories:[{id:1, name:'Dramatyczny'}, {id:2,name:'Przygodowy'}, {id:3, name:"Amerykański"}],
        img:small,
        hoverImg:hovered,
        logo:logo,
        ageCategory:18,
        premiere: new Date ("2021-12-22"),
        transcription:true
    },
    {
        title:"The Walking Dead",
        categories:[{id:1, name:'Dramatyczny'}, {id:2,name:'Przygodowy'}, {id:3, name:"Amerykański"}],
        img:small,
        hoverImg:hovered,
        logo:logo,
        ageCategory:18,
        premiere: new Date ("2021-12-22"),
        transcription:true
    },
    {
        title:"The Walking Dead",
        categories:[{id:1, name:'Dramatyczny'}, {id:2,name:'Przygodowy'}, {id:3, name:"Amerykański"}],
        img:small,
        hoverImg:hovered,
        logo:logo,
        ageCategory:18,
        premiere: new Date ("2021-12-22"),
        transcription:true
    },
    {
        title:"The Walking Dead",
        categories:[{id:1, name:'Dramatyczny'}, {id:2,name:'Przygodowy'}, {id:3, name:"Amerykański"}],
        img:small,
        hoverImg:hovered,
        logo:logo,
        ageCategory:18,
        premiere: new Date ("2021-12-22"),
        transcription:true
    },
    {
        title:"The Walking Dead",
        categories:[{id:1, name:'Dramatyczny'}, {id:2,name:'Przygodowy'}, {id:3, name:"Amerykański"}],
        img:small,
        hoverImg:hovered,
        logo:logo,
        ageCategory:18,
        premiere: new Date ("2021-12-22"),
        transcription:true
    },
]

const MainPage = () => {

    getFilms()
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
                <CategoryRow title="Ostatnio popularne" moviesList={list}/>

            </main>
        </div>
        </>
    )
}
export default MainPage