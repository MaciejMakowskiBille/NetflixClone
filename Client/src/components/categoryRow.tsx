import MovieTile from "./movieTile"
import small from '../imgs/testTile/mini.png'
import hovered from '../imgs/testTile/hover.png'
import logo from '../imgs/testTile/logo.png'
type CategoryRowPorps = {
    title:string,
}

const twd = {
    title:"The Walking Dead",
    categories:['Dramatyczny', 'Przygodowy', 'Amerykański'],
    img:small,
    hoverImg:hovered,
    logo:logo,
    ageCategory:18,
    premiere: new Date ("2021-12-22"),
    transcription:true
}

const CategoryRow = (props:CategoryRowPorps) => {

    return(
        <div className="category">
            <div className="title">
                {props.title}
            </div>
            <div className="movieList">
                <MovieTile 
                    title={twd.title}
                    categories={twd.categories}
                    img={twd.img}
                    hoverImg={twd.hoverImg}
                    logo={twd.logo}
                    ageCategory={twd.ageCategory}
                    premiere={twd.premiere}
                    transcription={twd.transcription}
                    sezons={11}
                />
                <MovieTile 
                    title={twd.title}
                    categories={twd.categories}
                    img={twd.img}
                    hoverImg={twd.hoverImg}
                    logo={twd.logo}
                    ageCategory={twd.ageCategory}
                    premiere={twd.premiere}
                    transcription={twd.transcription}
                    sezons={11}
                />
                <MovieTile 
                    title={twd.title}
                    categories={twd.categories}
                    img={twd.img}
                    hoverImg={twd.hoverImg}
                    logo={twd.logo}
                    ageCategory={twd.ageCategory}
                    premiere={twd.premiere}
                    transcription={twd.transcription}
                    sezons={11}
                />
                <MovieTile 
                    title={twd.title}
                    categories={twd.categories}
                    img={twd.img}
                    hoverImg={twd.hoverImg}
                    logo={twd.logo}
                    ageCategory={twd.ageCategory}
                    premiere={twd.premiere}
                    transcription={twd.transcription}
                    sezons={11}
                />
                <MovieTile 
                    title={twd.title}
                    categories={twd.categories}
                    img={twd.img}
                    hoverImg={twd.hoverImg}
                    logo={twd.logo}
                    ageCategory={twd.ageCategory}
                    premiere={twd.premiere}
                    transcription={twd.transcription}
                    sezons={11}
                />
            </div>
        </div>
    )
}
export default CategoryRow