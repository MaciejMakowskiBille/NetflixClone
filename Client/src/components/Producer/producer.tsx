import { serverURL } from "../../utils/links";

type ProducerType = {
    name:string;
    image:string;
}

const Producer = (props:ProducerType) => {


    return(
        <div  className="producer">
            <div className="producerImage" style={{backgroundImage:`url(${serverURL + props.image})`}}/>
        </div>
    )
}
export default Producer