import { useEffect, useState } from "react"
import { getSlider } from "../../utils/Gets"
import { serverURL } from "../../utils/links"
import { useNavigate } from "react-router-dom"


const Slider = () =>{
    const [sliderData, setSliderData] = useState<Slide[] | null>(null)
    const [activeSlide, setActiveSlide] = useState<Slide | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()
    const handleChangeSlide = (slide:Slide) => {
        setActiveSlide(slide)
    }

    useEffect(() => {
        if(isLoading){
            getSlider().then((res) => {
                setSliderData(prev => prev = res)
                setIsLoading(prev => prev = false)
            })
        }
        if(sliderData) setActiveSlide(prev => prev = sliderData[0])
    },[isLoading])

    return(
        <>
        {!isLoading && sliderData ? (
            <div className="slider">
                {activeSlide && (
                    <div 
                        className="slide" 
                        style={{backgroundImage:`url(${serverURL + activeSlide.image})`}}
                    >
                    <div 
                        className="logo" 
                        style={{backgroundImage:`url(${serverURL + activeSlide.logo})`}}
                        onClick={() => navigate(`movie/${activeSlide.movieType}/${activeSlide.movieId}`)}
                        />
                    <div className="sliderNav">
                        {sliderData.map(slide => {
                            return( 
                                <button 
                                    key={slide.id} 
                                    onClick={() => handleChangeSlide(slide)} 
                                    className={activeSlide.id === slide.id ? "indicator active" : "indicator"}
                                />
                                )
                        })}
                    </div>
                </div>
                )}
            </div>
        ) : (
            <div>

            </div>
        )}
        </>
    )
}

export default Slider