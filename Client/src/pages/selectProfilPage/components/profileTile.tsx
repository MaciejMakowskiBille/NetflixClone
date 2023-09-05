import { useNavigate } from "react-router-dom"
import { serverURL } from "../../../utils/links"

type ProfileTileProps = {
    name: string,
    image: string
}

const ProfileTile = ({name, image}: ProfileTileProps) =>{
    const navigate = useNavigate()
    return(
            <div className="profileTile" onClick={() => navigate('/main')} >
                <div className="profileImg">
                {
                    image ? 
                    <img src={`${serverURL}${image}`} />
                    : null
                }
            </div>
            <div className="profileName">
                {name}
            </div>
        </div>
    )
}

export default ProfileTile