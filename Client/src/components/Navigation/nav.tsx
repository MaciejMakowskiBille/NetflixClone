import { useState } from 'react'
import {motion} from 'framer-motion'
import { useNavigate } from 'react-router-dom'
const Navigation = () => {
    const [inputValue, setInputValue] = useState('');
    const [isSearch, setIsSearch] = useState(false)

    const navigate = useNavigate()

    const handleClickSearch = () => {
        setIsSearch((prev) => prev = !prev)
    }

    const handleSearch = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            navigate(`/list/search/${inputValue}`)
        }

    }

    return(
        <>
            <nav>
                <div className='navLeft'>
                    <div className='filmexLogo' onClick={() => navigate('/main')} >
                        Filme
                        <span>x</span>
                    </div>
                    <ul>
                        <li onClick={() => navigate('/main')}>
                            Strona główna
                        </li>
                        <li onClick={() => navigate('/list/series/all')}>
                            Seriale i programy
                        </li>
                        <li onClick={() => navigate('/list/movies/all')}>
                            Filmy
                        </li>
                        <li onClick={() => navigate('/producers')}>
                            Producenci
                        </li>
                        <li onClick={() => navigate('/list/new/all')}>
                            Najnowsze
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
                        className='input-background'
                        type='text' 
                        placeholder='Po wpisaniu wciśnij enter'
                        onKeyDown={handleSearch}
                        onChange={(e) => setInputValue(e.target.value)}
                        />
                    </motion.div>
                    )
                    }
                    <button className={isSearch ? 'closeButton icon' : 'searchButton icon'} onClick={handleClickSearch}/>
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
