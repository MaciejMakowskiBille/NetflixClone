export default function SuccessModal({
  title,
  content,
}: {
  title: string;
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
            Zaloguj się
          </button>
        </footer>
      </div>
    </div>
  );
}
