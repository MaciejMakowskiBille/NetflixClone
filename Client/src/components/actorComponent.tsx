import { serverURL } from "../utils/links"


type ActorComponentProps = {
    image:string
    firstName:string
    lastName:string
}

const ActorComponent = (props:ActorComponentProps) => {

    return(
        <div className="actorComponent">
            <div className="actorImg" style={{backgroundImage: `url(${serverURL + props.image})`}} />

            <div className="actorName">
                {props.firstName}
                <br></br>
                {props.lastName}
            </div>
        </div>
    )
}

export default ActorComponent