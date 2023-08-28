import { useNavigate } from "react-router-dom";
import { serverURL } from "../../utils/links";

type ProducerType = {
    name:string;
    image:string;
}

const Producer = (props:ProducerType) => {
    const navigate = useNavigate()

    return(
        <div  className="producer" onClick={() => navigate(`/list/producers/${props.name}`)}>
            <div className="producerImage" style={{backgroundImage:`url(${serverURL + props.image})`}}/>
        </div>
    )
}
export default Producer