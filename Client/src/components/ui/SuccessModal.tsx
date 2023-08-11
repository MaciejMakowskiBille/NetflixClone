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
      <div className="card modal">
        <header>
          <h1>{title}</h1>
        </header>
        <div className="content">
          <p>{content}</p>
        </div>
        <footer>
          <button type="button" className="button-secondary">
            Okey
          </button>
        </footer>
      </div>
    </div>
  );
}
