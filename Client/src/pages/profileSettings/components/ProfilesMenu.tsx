import arrow from '../../../imgs/icons/settingsArrow.svg';
import avatar from '../../../imgs/avatars/avatar.png';
import { serverURL } from '../../../utils/links';
import { useState } from 'react';
import { EditProfileModal } from './editProfileModal';

const ProfilesMenu = ({
    data,
    clickedIndex,
    setClickedIndex,
    setRemoveProfileModalIsOpen,
}: {
    data: Array<
        ProfileResponseType['attributes'] & {
            id: number;
        }
    >;
    clickedIndex: number;
    setClickedIndex: React.Dispatch<React.SetStateAction<number>>;
    setRemoveProfileModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [modal, setModal] = useState<JSX.Element | null>(null);
    const currentProfileId = Number(localStorage.getItem('profileId'));
    return (
        <ul className='profilesMenu'>
            {data.map((item) => {
                const profileImg = item.avatar?.url;

                const handleClick = () => {
                    // if index is clicked, after next click clickedIndex state is cleaned up
                    if (clickedIndex == item.id) {
                        setClickedIndex(-1);
                    } else {
                        setClickedIndex(item.id);
                    }
                };

                const handleRemoveProfileClick = () => {
                    setRemoveProfileModalIsOpen(true);
                };
                return (
                    <li className='profilesMenu-item' key={item.id}>
                        <div
                            className='profilesMenu-item__header'
                            onClick={handleClick}
                        >
                            <div className='profilesMenu-item__profileData'>
                                <img
                                    src={
                                        profileImg
                                            ? serverURL + profileImg
                                            : avatar
                                    }
                                    className='profilesMenu-item__photo'
                                />
                                <div className='profilesMenu-item__text'>
                                    <h4 className='name'>{item.username}</h4>
                                    <p>{item.ageGroup}</p>
                                </div>
                            </div>
                            <div
                                className={
                                    clickedIndex == item.id
                                        ? 'arrow arrow--open'
                                        : 'arrow'
                                }
                            >
                                <img src={arrow} />
                            </div>
                        </div>
                        <div
                            className={
                                clickedIndex == item.id
                                    ? 'drop-down drop-down--open'
                                    : 'drop-down'
                            }
                        >
                            <div className='drop-down__content'>
                                <p
                                    className='textButton'
                                    onClick={() => {
                                        setModal(
                                            <EditProfileModal
                                                key={item.id + 'modal'}
                                                profileId={item.id}
                                                profileAvatar={item.avatar?.url}
                                                ageGroup={item.ageGroup}
                                                profileName={item.username}
                                                closeModal={setIsEditModalOpen}
                                            />
                                        );
                                        setIsEditModalOpen(true);
                                    }}
                                >
                                    Edytuj dane
                                </p>
                                {currentProfileId !== item.id ? (
                                    <p
                                        className='textButton'
                                        onClick={handleRemoveProfileClick}
                                    >
                                        Usuń profil
                                    </p>
                                ) : null}
                            </div>
                        </div>
                    </li>
                );
            })}
            {isEditModalOpen ? modal : null}
        </ul>
    );
};

export default ProfilesMenu;
