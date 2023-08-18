export default function Modal({
  title,
  buttonText,
  content,
}: {
  title: string;
  buttonText: string;
  content: string;
}) {
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
          <button type="button" className="button-secondary">
            {buttonText}
          </button>
        </footer>
      </div>
    </div>
  );
}
