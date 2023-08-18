import circle from "../../../../imgs/icons/circle.svg";
import circle_fill from "../../../../imgs/icons/circle-fill.svg";

export default function PaymentsOffer({
  text,
  cost,
  className,
  onClick,
}: {
  text: string;
  cost: string;
  className: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}) {
  return (
    <div className={"payments-offer " + className} onClick={onClick}>
      <div className="payments-offer__text">
        <h3>{text}</h3>
        <h5>{cost}</h5>
      </div>
      <div className="circles">
        <img className="circle" src={circle} alt="circle" />
        <img className="circle-filled" src={circle_fill} alt="circle" />
      </div>
    </div>
  );
}
