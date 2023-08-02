export default function Switch({
  name,
  onClick,
  img,
  className,
}: {
  name: string;
  onClick?: React.MouseEventHandler;
  img: string;
  className: string;
}) {
  return (
    <div className={"item " + className} onClick={onClick}>
      <img className="paypal" src={img} alt="img" />
      <p>{name}</p>
    </div>
  );
}
