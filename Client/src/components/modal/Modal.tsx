import { ReactNode } from "react";

export default function Modal({
  title,
  btnText,
  children,
  setModalIsOpen,
  onSubmit,
}: {
  title: string;
  btnText: string[];
  children: ReactNode;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  onSubmit: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) {
  function handleCloseModal() {
    setModalIsOpen?.(false);
  }

  return (
    <>
      <div className="backdrop" />
      <div className="modal">
        <header className="modal__header">
          <h2>{title}</h2>
          {setModalIsOpen && (
            <button
              className="closeButton icon right"
              onClick={handleCloseModal}
            />
          )}
        </header>
        <div className="modal__content">{children}</div>
        <footer className="modal__actions">
          <button className="button-primary" onClick={onSubmit}>
            {btnText[0]}
          </button>
          {btnText.length === 2 && (
            <button className="button-secondary">{btnText[1]}</button>
          )}
        </footer>
      </div>
    </>
  );
}
