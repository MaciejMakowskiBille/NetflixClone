import { useState } from 'react'
import {motion} from 'framer-motion'
const Navigation = () => {
    const [isSearch, setIsSearch] = useState(false)

    const handleClickSearch = () => {
        setIsSearch(prev => prev = !prev)
    }

    return(
        <>
            <nav>
                <div className='navLeft'>
                    <div className='filmexLogo'>
                        Filme
                        <span>x</span>
                    </div>
                    <ul>
                        <li>
                            Strona główna
                        </li>
                        <li>
                            Seriale i programy
                        </li>
                        <li>
                            Filmy
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
