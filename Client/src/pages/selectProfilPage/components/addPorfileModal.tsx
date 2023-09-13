import {useState} from 'react'
import { addProfile } from '../../../utils/Posts';
type AddProfileModalProps = {
    setIsModalOpen:React.Dispatch<React.SetStateAction<boolean>>
}

const AddProfileModal = (props:AddProfileModalProps) =>{
    const [newProfileInfo, setNewProfileInfo] = useState<NewProfileInfo>({
        name: "",
        ageGroup: 'kid',
        avatar: null,
    });

    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setNewProfileInfo(prevProfileInfo => ({
            ...prevProfileInfo,
            [e.target.name]: e.target.value
        }))
    }
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setNewProfileInfo(prevProfileInfo => ({
                ...prevProfileInfo,
                avatar: file
            }))
        }
      };

    const handleCloseModal = () =>{
        props.setIsModalOpen(false)
    }

    const handleAddProfile = async () =>{
        const userId = Number(localStorage.getItem("userId"))
        const response = await addProfile({...newProfileInfo, userId: userId});
        if (response) {
            handleCloseModal();
        }
    }
    
    return(
        <div className="AddProfileModal">
            <button className="closeButton icon right" onClick={handleCloseModal}/>
            <div className="title">
                Dodaj nowy profil
            </div>
            <div className="inputs">
                <input name="name" type="text" placeholder="Wpisz nazwę" className="input-background" onChange={handleChange}></input>
                <label htmlFor="ageGroupSelect">Wybierz kategorię wiekową</label>
                <select name="ageGroup" id="ageGroupSelect" onChange={handleChange}>
                    <option value="kid">Dzieci</option>
                    <option value="teen">Młodzież</option>
                    <option value="adult">Dorośli</option>
                </select>
                <div className="file">
                    <label>
                        Dodaj zdjęcie
                    </label>
                    <input name="image" type="file" accept="image/png, image/jpeg" onChange={handleImageChange}></input>
                    {newProfileInfo.avatar && <img src={URL.createObjectURL(newProfileInfo.avatar)} alt="Selected" />}
                </div>
            </div>
            <div className="addRow">
                <button className="button-primary" onClick={handleAddProfile}>DODAJ</button>
            </div>
        </div>
    )
}

export default AddProfileModal