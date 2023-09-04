import { useNavigate } from "react-router-dom"
import ProfileTile from "./components/profileTile"
import {useState} from 'react'
import AddProfileModal from "./components/addPorfileModal"


const SelectProfilePage = () =>{
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false)
    
    const handleClickAddButton = () => {
        setIsModalOpen(true)
    }

    return(
        <div className="appBackground">
            <main>
                <section className="profileContainer">
                    <ProfileTile/>
                    <ProfileTile/>
                    <ProfileTile/>
                    <ProfileTile/>
                    <div className="icon addButton iconButton" onClick={handleClickAddButton}/>
                </section>
                    <button className="button-exit profile-exit-button" onClick={() => navigate("/")}>WYLOGUJ</button>
                    {isModalOpen && (
                        <AddProfileModal setIsModalOpen={setIsModalOpen}/>
                    )}
            </main>
        </div>
    )
}

export default SelectProfilePage