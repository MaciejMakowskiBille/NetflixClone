import { useState } from 'react'
import {motion} from 'framer-motion'
import { useNavigate } from 'react-router-dom'
const Navigation = () => {
    const navigate = useNavigate()
    const [isSearch, setIsSearch] = useState(false)

    const handleClickSearch = () => {
        setIsSearch((prev) => prev = !prev)
    }

    return(
        <>
            <nav>
                <div className='navLeft'>
                    <div className='filmexLogo' onClick={() => navigate('/')} >
                        Filme
                        <span>x</span>
                    </div>
                    <ul>
                        <li onClick={() => navigate('/')}>
                            Strona główna
                        </li>
                        <li onClick={() => navigate('/list/series')}>
                            Seriale i programy
                        </li>
                        <li onClick={() => navigate('/list/movies')}>
                            Filmy
                        </li>
                        <li onClick={() => navigate('/producers')}>
                            Producenci
                        </li>
                        <li>
                            Nowe i popularne
                        </li>
                        <li>
                            Moja lista
                        </li>
                    </ul>
                </div>
                <div className='navRight'>
                {isSearch && (
                    <motion.div
                    className='navSearch'
                    initial={{x:100, opacity:0}}
                    whileInView={{x:0, opacity:1}}
                    >
                        <input 
                        type='text' 
                        placeholder='Wpisz tytuł filmu, serialu ...'
                        />
                    </motion.div>
                    )
                    }
                    <button className='searchButton icon' onClick={handleClickSearch}/>
                    <div className='navMenu'>
                        <div className='avatar'/>
                        <div className='icon menuArrow'/>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navigation
