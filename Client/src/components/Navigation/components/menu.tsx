import { useNavigate } from "react-router-dom"

type MenuProps = {
    isOpen:boolean
}

const Menu = (props:MenuProps) => {
    const navigate = useNavigate()

    const handleLogOut = () => {
        navigate('/')
    }

    return(
        <div className={props.isOpen ? "menu open" : "menu close"}>
            <div className="menu-item" onClick={() => navigate("/profile")}>
                Profile
            </div>
            <div className="menu-item">
                Opcje
            </div>
            <div className="menu-item" onClick={handleLogOut}>
                Wyloguj
            </div>

        </div>
    )
}

export default Menu