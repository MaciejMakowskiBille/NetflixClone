
type MenuProps = {
    isOpen:boolean
}

const Menu = (props:MenuProps) => {

    return(
        <div className={props.isOpen ? "menu open" : "menu close"}>
            <div className="menu-item">
                Profile
            </div>
            <div className="menu-item">
                Opcje
            </div>
            <div className="menu-item">
                Wyloguj
            </div>

        </div>
    )
}

export default Menu