import { useNavigate } from "react-router-dom"



const ProfileTile = () =>{
    const navigate = useNavigate()

    return(
        <div className="profileTile" onClick={() => navigate('/main')} >
            <div className="profileImg"/>
            <div className="profileName">
                Name
            </div>
        </div>
    )
}

export default ProfileTile