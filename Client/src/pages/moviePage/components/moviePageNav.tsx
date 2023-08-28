import { useParams } from "react-router-dom"

type MoviePageNavProps ={
    active:string
    setActive: React.Dispatch<React.SetStateAction<string>>
}

const MoviePageNav = (props:MoviePageNavProps) => {
    const actives = ['sea','rec', 'det', 'cast']
    const {movieType} = useParams()

    const handleClick = (value:string) => {
            props.setActive(value)
    }

    const getBorderStyles = (active:string, value:string) =>{
        if(active === value) return '#782CBF 4px solid'
        return 'none'
    }


    return(
            <div className="movieNav">
                    <ul>
                        {movieType === 's' && (
                            <li 
                            style={{borderBottom: getBorderStyles(props.active, actives[0])}}
                            onClick={(() => handleClick('sea'))}
                        >
                            Odcinki
                        </li>
                        )}
                        <li 
                            style={{borderBottom: getBorderStyles(props.active, actives[1])}}
                            onClick={(() => handleClick('rec'))}
                        >
                            Proponowane
                        </li>
                        <li
                            style={{borderBottom: getBorderStyles(props.active, actives[2])}}
                            onClick={(() => handleClick('det'))}
                        >
                            Szczegóły
                            </li>
                        <li
                            style={{borderBottom: getBorderStyles(props.active, actives[3])}}
                            onClick={(() => handleClick('cast'))}
                        >
                            Obsada
                            </li>
                    </ul>
            </div>
    )
}

export default MoviePageNav