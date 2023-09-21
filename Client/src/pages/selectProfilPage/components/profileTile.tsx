import { useNavigate } from 'react-router-dom';
import { serverURL } from '../../../utils/links';

type ProfileTileProps = {
    name: string;
    image: string;
    profileId: number;
};

const ProfileTile = ({ name, image, profileId }: ProfileTileProps) => {
    const navigate = useNavigate();

    const chooseProfile = () => {
        localStorage.setItem('profileId', `${profileId}`);
        localStorage.setItem('avatarUrl', `${image}`);
        navigate('/main');
    };

    return (
        <div className='profile__tile' onClick={chooseProfile}>
            <div className='profile__tile--img'>
                {image ? <img src={`${serverURL}${image}`} /> : null}
            </div>
            <div className='profile__tile--name'>{name}</div>
        </div>
    );
};

export default ProfileTile;
