import {useState} from 'react'
type AddProfileModalProps = {
    setIsModalOpen:React.Dispatch<React.SetStateAction<boolean>>
}


const AddProfileModal = (props:AddProfileModalProps) =>{
    const [name, setName] = useState('')
    const [file, setFile] = useState<File | null>(null)

    const handleType = (e:React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
          setFile(file);
        }
      };

    const handleCloseModal = () =>{
        props.setIsModalOpen(false)
    }

    const handleAddProfile = () =>{
        return null
    }
    return(
        <div className="AddProfileModal">
            <button className="closeButton icon right" onClick={handleCloseModal}/>
            <div className="title">
                Dodaj nowy profil
            </div>
            <div className="inputs">
                <input type="text" placeholder="Wpisz nazwę" className="input-background" onChange={handleType}></input>
                <div className="file">
                    <label>
                        Dodaj zdjęcie
                    </label>
                    <input type="file" accept="image/png, image/jpeg" onChange={handleImageChange}></input>
                    {file && <img src={URL.createObjectURL(file)} alt="Selected" />}
                </div>
            </div>
            <div className="addRow">
                <button className="button-primary" onClick={handleAddProfile}>DODAJ</button>
            </div>
        </div>
    )
}

export default AddProfileModal