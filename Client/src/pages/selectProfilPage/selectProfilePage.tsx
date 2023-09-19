import { useNavigate } from "react-router-dom";
import ProfileTile from "./components/profileTile";
import { useEffect, useState } from "react";
import AddProfileModal from "./components/addPorfileModal";
import { getUserProfiles } from "../../utils/Gets";
import { useSignedInContext } from "../../providers/signedInProvider";

const SelectProfilePage = () => {
  const navigate = useNavigate();
  const signedInContext = useSignedInContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userProfiles, setUserProfiles] = useState<ProfileInfo[] | null>();
  const [isLoading, setIsLoading] = useState(true);

  const handleClickAddButton = () => {
    setIsModalOpen(true);
  };

  const handleSignOut = () => {
    localStorage.clear();
    signedInContext.setIsSignedIn(false);
    navigate("/");
  };

  if (userProfiles && userProfiles[0]) {
    localStorage.setItem("profileId", `${userProfiles[0].id}`);
  }

  useEffect(() => {
    const userId = Number(localStorage.getItem("userId"));
    getUserProfiles(userId)
      .then((response) => {
        setUserProfiles(response);
        setIsLoading(false);
      })
      .catch(() => {
        throw new Error("Wystąpił nieoczekiwany błąd");
      });
  }, [isModalOpen]);

  return (
    <div className="appBackground">
      <main>
        <section className="profileContainer">
          {!isLoading
            ? userProfiles?.map((profile) => (
                <ProfileTile
                  key={profile.id}
                  name={profile.attributes.username}
                  image={profile.attributes.avatar.data?.attributes.url}
                  profileId={profile.id}
                />
              ))
            : null}
          <div
            className="icon addButton iconButton"
            onClick={handleClickAddButton}
          />
        </section>
        <button
          className="button-exit profile-exit-button"
          onClick={handleSignOut}
        >
          WYLOGUJ
        </button>
        {isModalOpen && <AddProfileModal setIsModalOpen={setIsModalOpen} />}
      </main>
    </div>
  );
};

export default SelectProfilePage;
