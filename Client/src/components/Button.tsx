export default function Button({
  text,
  onClick,
}: {
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button className="card__btn" onClick={onClick}>
      Kontynułuj
    </button>
  );
}
