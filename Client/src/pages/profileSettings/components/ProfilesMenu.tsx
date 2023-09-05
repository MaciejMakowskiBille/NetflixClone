import arrow from "../../../imgs/icons/settingsArrow.svg";
import avatar from "../../../imgs/avatars/avatar.png";
import { serverURL } from "../../../utils/links";

const ProfilesMenu = ({
  data,
  clickedIndex,
  setClickedIndex,
}: {
  data: Array<
    ProfileResponseType["attributes"] & {
      id: number;
    }
  >;
  clickedIndex: number;
  setClickedIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return data.map((item, index) => {
    const profileImg = item.avatar?.url;

    const handleClick = () => {
      // if index is clicked, after next click clickedIndex state is cleaned up
      if (clickedIndex == index) {
        setClickedIndex(-1);
      } else {
        setClickedIndex(index);
      }
    };
    return (
      <li className="profilesMenu-item" key={index}>
        <div className="profilesMenu-item__header" onClick={handleClick}>
          <div className="profilesMenu-item__profileData">
            <img
              src={profileImg ? serverURL + profileImg : avatar}
              className="profilesMenu-item__photo"
            />
            <div className="profilesMenu-item__text">
              <h4 className="name">{item.username}</h4>
              <p>{item.ageGroup}</p>
            </div>
          </div>
          <div
            className={clickedIndex == index ? "arrow arrow--open" : "arrow"}
          >
            <img src={arrow} />
          </div>
        </div>
        <div
          className={
            clickedIndex == index ? "drop-down drop-down--open" : "drop-down"
          }
        >
          <div className="drop-down__content">
            <p className="textButton">Edytuj dane</p>
            <p className="textButton">Usuń profil</p>
          </div>
        </div>
      </li>
    );
  });
};

export default ProfilesMenu;
