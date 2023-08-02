import {useState} from 'react'

type MoviePageNavProps ={
    active:string
    setActive: React.Dispatch<React.SetStateAction<string>>
}

const MoviePageNav = (props:MoviePageNavProps) => {

    const handleClick = (value:string) => {
            props.setActive(prev => prev = value)
    }


    return(
            <div className="movieNav">
                    <ul>
                        <li 
                            style={{borderBottom: props.active === 'rec' ? ' #782CBF 4px solid' : "none"}}
                            onClick={(() => handleClick('rec'))}
                        >
                            Proponowane
                        </li>
                        <li
                            style={{borderBottom: props.active === 'det' ? ' #782CBF 4px solid' : "none"}}
                            onClick={(() => handleClick('det'))}
                        >
                            Szczegóły
                            </li>
                        <li
                            style={{borderBottom: props.active === 'cast' ? ' #782CBF 4px solid' : "none"}}
                            onClick={(() => handleClick('cast'))}
                        >
                            Obsada
                            </li>
                    </ul>
            </div>
    )
}

export default MoviePageNav