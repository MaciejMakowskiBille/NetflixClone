import { SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { modalTypes } from "../../types/registrationTypes";

export default function Modal({
  title,
  buttonText,
  closeModal,
  content,
}: {
  title: string;
  buttonText: string;
  closeModal: React.Dispatch<SetStateAction<modalTypes>>;
  content: string;
}) {
  const navigate = useNavigate();

  return (
    <div>
      <div className="backdrop" />
      <div className="modal">
        <header className="modal__header">
          <h1>{title}</h1>
        </header>
        <div className="modal__content">
          <p>{content}</p>
        </div>
        <footer className="modal__actions">
          <button
            type="button"
            className="form-button button-secondary"
            onClick={
              buttonText === "Przejdź do serwisu"
                ? () => navigate("/profile")
                : () => {
                    closeModal;
                  }
            }
          >
            {buttonText}
          </button>
        </footer>
      </div>
    </div>
  );
}
