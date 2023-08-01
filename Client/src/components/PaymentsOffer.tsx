export default function PaymentsOffer({
  text,
  cost,
}: {
  text: string;
  cost: string;
}) {
  return (
    <div className="payments-offer">
      <div className="payments-offer__text">
        <h3>{text}</h3>
        <h5>{cost}</h5>
      </div>
      <img src="../images/circle" alt="circle" />
    </div>
  );
}
