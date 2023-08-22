import { useNavigate } from "react-router-dom"
import ProfileTile from "./components/profileTile"


const SelectProfilePage = () =>{
    const navigate = useNavigate()

    return(
        <div className="appBackground">
            <main>
                <section className="profileContainer">
                    <ProfileTile/>
                    <ProfileTile/>
                    <ProfileTile/>
                    <ProfileTile/>
                    <div className="icon addButton iconButton"/>
                </section>
                    <button className="button-exit profile-exit-button" onClick={() => navigate("/")}>WYLOGUJ</button>
            </main>
        </div>
    )
}

export default SelectProfilePage