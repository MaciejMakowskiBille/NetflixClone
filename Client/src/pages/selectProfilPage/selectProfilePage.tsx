import { useNavigate } from 'react-router-dom';
import ProfileTile from './components/profileTile';
import { useEffect, useState } from 'react';
import AddProfileModal from './components/addPorfileModal';
import { getUserProfiles } from '../../utils/Gets';
import { useSignedInContext } from '../../providers/signedInProvider';
import { setAuthToken } from '../../utils/Posts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

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
        setAuthToken('');
        signedInContext.setIsSignedIn(false);
        navigate('/');
    };

    if (userProfiles && userProfiles[0].attributes.avatar.data) {
        localStorage.setItem('profileId', `${userProfiles[0].id}`);
        localStorage.setItem(
            'avatarUrl',
            `${userProfiles[0].attributes.avatar.data.attributes.url}`
        );
    }

    useEffect(() => {
        const userId = Number(localStorage.getItem('userId'));
        getUserProfiles(userId)
            .then((response) => {
                setUserProfiles(response);
                setIsLoading(false);
            })
            .catch(() => {
                throw new Error('Wystąpił nieoczekiwany błąd');
            });
    }, [isModalOpen]);

    return (
        <div className='appBackground'>
            <main>
                <h1 className='profileHeader'>Wybierz profil</h1>
                <section className='profileContainer'>
                    {!isLoading
                        ? userProfiles?.map((profile) => (
                              <ProfileTile
                                  key={profile.id}
                                  name={profile.attributes.username}
                                  image={
                                      profile.attributes.avatar.data?.attributes
                                          .url
                                  }
                                  profileId={profile.id}
                              />
                          ))
                        : null}
                    <div
                        className='icon addButton iconButton'
                        onClick={handleClickAddButton}
                    >
                        <div className='addButton--image'><FontAwesomeIcon icon={faPlus} size='2x'/></div>
                        <div className='addButton--label'>Dodaj profil</div>
                    </div>
                </section>
                <button
                    className='button-exit profile-exit-button'
                    onClick={handleSignOut}
                >
                    WYLOGUJ
                </button>
                {isModalOpen && (
                    <AddProfileModal setIsModalOpen={setIsModalOpen} />
                )}
            </main>
        </div>
    );
};

export default SelectProfilePage;
