import {useState, useEffect} from 'react'
import { getAllTypeMoviesByProducer, getCategories, getFilms, getSeries } from "../../utils/Gets"
import { useNavigate, useParams } from 'react-router-dom'
import Navigation from '../../components/Navigation/nav'
import CategoryRow from '../../components/CategoryRow/categoryRow'
import { ChangeEvent } from 'react'

const FilteredMovies = () => {
    const [moviesData, setMoviesData] = useState<CombinedDataType | null>(null)
    const [categories, setCategories] = useState<Category[] | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [filterCategory, setFilterCategory] = useState<Category | null>(null)
    const [filteredData, setFilteredData] = useState<CombinedDataType | null>(null)

    const navigate = useNavigate()
    const {type, producer} = useParams()

    const handleChangeFilter = (event: ChangeEvent<HTMLSelectElement>) => {
        if (categories) {
            const selectedCategory = categories.find(category => category.id === Number(event.target.value));
            if (selectedCategory) {
                setFilterCategory(selectedCategory);
            }
        }
        
    }

    const filterData = (data:CombinedDataType) => {
        if(filterCategory){
            const res = data.filter(item =>
                item.categories.some(category => category.id === filterCategory.id)
            )
            return res
        }
        else {return moviesData}
    }

    const assignData = (foo:Promise<CombinedDataType | null>) =>{
        foo.then((res) => {
            setMoviesData(res)
            setFilteredData(res)
            setIsLoading(false)
        }).catch((error) => {
            setIsLoading(true)
            console.log(error)
        })
    }

    useEffect(() => {
        setMoviesData(null)
        if(type && type === 'movies')
        {
            assignData(getFilms())
        }else if(type && type === 'series'){
            assignData(getSeries())
        }else if(type && type === 'producers' && producer){
            assignData(getAllTypeMoviesByProducer(producer))
        }else
        {
            navigate('/')
        }

        getCategories().then((res) => {
            setCategories(res)
            setIsLoading(false)
        }).catch((error) => {
            setIsLoading(true)
            console.log(error)
        })
    },[type])

    useEffect(() => {
        if(filterCategory && filterCategory.filter){
            moviesData  && setFilteredData(filterData(moviesData))
        }else{
            setFilteredData(moviesData)
        }
    }, [filterCategory])

    return(
        <>
            <div className="appBackground">
                <Navigation/>
                <main>
                    <div className='filterPage'>
                        <select 
                        name='filter'
                        onChange={handleChangeFilter}
                        placeholder='Wszystkie'
                        >
                            
                            {categories?.map(category => {
                                return(
                                    <option
                                     key={category.id}
                                     value={category.id}
                                     >
                                        {category.name}
                                    </option>
                                )
                            })}
                        </select>

                    </div>
                {!isLoading && categories && filteredData && (
                    categories.map(category => {
                        if(category.name !== filterCategory?.name)
                        return(
                            <CategoryRow 
                                key={category.id} 
                                title={category.name}
                                moviesList={filteredData}
                             />
                        )
                    })
                )}
                </main>
            </div>
        </>
    )
}

export default FilteredMovies