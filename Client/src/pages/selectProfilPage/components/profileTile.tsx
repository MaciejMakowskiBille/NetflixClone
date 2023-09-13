import { useNavigate } from "react-router-dom"
import { serverURL } from "../../../utils/links"

type ProfileTileProps = {
    name: string,
    image: string
    profileId: number
}

const ProfileTile = ({name, image, profileId}: ProfileTileProps) =>{
    const navigate = useNavigate()

    const chooseProfile = () => {
        localStorage.setItem("profileId", `${profileId}`);
        navigate('/main');
    }

    return(
            <div className="profileTile" onClick={chooseProfile} >
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