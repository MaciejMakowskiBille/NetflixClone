import { useNavigate } from "react-router-dom";
import { useSignedInContext } from "../../../providers/signedInProvider";

type MenuProps = {
  isOpen: boolean;
};

const Menu = (props: MenuProps) => {
  const navigate = useNavigate();
  const signedInContext = useSignedInContext();

  const handleLogOut = () => {
    localStorage.clear();
    signedInContext.setIsSignedIn(false);
    navigate("/");
  };

  return (
    <div className={props.isOpen ? "menu open" : "menu close"}>
      <div className="menu-item" onClick={() => navigate("/profile")}>
        Profile
      </div>
      <div className="menu-item">Opcje</div>
      <div className="menu-item" onClick={handleLogOut}>
        Wyloguj
      </div>
    </div>
  );
};

export default Menu;
