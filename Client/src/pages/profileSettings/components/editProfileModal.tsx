import { faPen, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { serverURL } from '../../../utils/links';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { updateProfile } from '../../../utils/Puts';

type AgeGroup = 'kid' | 'teen' | 'adult';

type AgeGroupOptionsType = {
    value: AgeGroup;
    label: string;
};

type PropsType = {
    closeModal: React.Dispatch<React.SetStateAction<boolean>>;
    profileId: number;
    profileName: string;
    ageGroup: AgeGroup;
    profileAvatar: string | null | undefined;
};

type NewProfileInfo = {
    avatar: File | null;
    name: string;
    ageGroup: string;
};

export const EditProfileModal = ({
    closeModal,
    profileId,
    ageGroup,
    profileAvatar,
    profileName,
}: PropsType) => {
    const [newProfileInfo, setNewProfileInfo] = useState<NewProfileInfo>({
        avatar: null,
        name: '',
        ageGroup: '',
    });

    const imageInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setNewProfileInfo((prevProfileInfo) => ({
                ...prevProfileInfo,
                avatar: file,
            }));
        }
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewProfileInfo((prev) => ({
            ...prev,
            name: e.target.value,
        }));
    };

    const handleAgeGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setNewProfileInfo((prev) => ({
            ...prev,
            ageGroup: e.target.value,
        }));
    };

    const ageGroupOptions: AgeGroupOptionsType[] = [
        { value: 'kid', label: 'Dzieci' },
        { value: 'teen', label: 'Młodzież' },
        { value: 'adult', label: 'Dorośli' },
    ];

    const openImageInput = () => {
        imageInputRef?.current?.click();
    };

    const handleUpdateProfile = () => {
        updateProfile(
            profileId,
            newProfileInfo.name,
            newProfileInfo.avatar,
            newProfileInfo.ageGroup
        );
    };

    return (
        <motion.div
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            transition={{ duration: 0.1 }}
            className='edit-profile-modal'
            onClick={() => closeModal(false)}
        >
            <motion.div
                initial={{ transform: 'translateY(-20%)', opacity: 0 }}
                animate={{ transform: 'translateY(0%)', opacity: 1 }}
                transition={{ duration: 0.1, delay: 0.1 }}
                className='container'
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div className='edit-profile-modal__header'>
                    <h1 className='edit-profile-modal__header--title'>
                        EDYTUJ PROFIL
                    </h1>
                    <FontAwesomeIcon
                        className='edit-profile-modal__header--icon'
                        icon={faX}
                        size='2xl'
                        onClick={() => closeModal(false)}
                    />
                </div>
                <hr></hr>
                <div className='edit-profile-modal__section'>
                    <div
                        className='edit-profile-modal__section--avatar-display'
                        style={{
                            backgroundImage: newProfileInfo.avatar
                                ? `url(${URL.createObjectURL(
                                      newProfileInfo.avatar
                                  )})`
                                : `url(${serverURL}${profileAvatar}`,
                        }}
                        onClick={() => openImageInput()}
                    >
                        <FontAwesomeIcon
                            className='edit-profile-modal__section--avatar-display--icon'
                            icon={faPen}
                            size='1x'
                        />
                        <span className='edit-profile-modal__section--avatar-display--text'>
                            Zmień avatar
                        </span>
                    </div>
                    <input
                        className='edit-profile-modal__section--avatar-input'
                        type='file'
                        name='avatar'
                        ref={imageInputRef}
                        onChange={handleImageChange}
                    />
                </div>
                <div className='edit-profile-modal__section'>
                    <div className='edit-profile-modal__section--profile-name'>
                        <input
                            type='text'
                            name='profileName'
                            placeholder={profileName}
                            value={newProfileInfo.name}
                            onChange={handleNameChange}
                        />
                    </div>
                    <div className='edit-profile-modal__section--age-category'>
                        <span>Grupa wiekowa: </span>
                        <select
                            value={
                                newProfileInfo.ageGroup
                                    ? newProfileInfo.ageGroup
                                    : ageGroup
                            }
                            onChange={handleAgeGroupChange}
                        >
                            {ageGroupOptions.map((option, index) => (
                                <option
                                    value={option.value}
                                    key={`${index}-${option.value}-${option.label}`}
                                    defaultChecked={option.value === ageGroup}
                                >
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <button
                    className='edit-profile-modal__save'
                    onClick={handleUpdateProfile}
                >
                    Zapisz <FontAwesomeIcon icon={faCheck} size='1x' />
                </button>
            </motion.div>
        </motion.div>
    );
};
