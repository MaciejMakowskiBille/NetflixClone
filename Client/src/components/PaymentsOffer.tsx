export default function PaymentsOffer({
  text,
  cost,
}: {
  text: string;
  cost: string;
}) {
  return (
    <div className="payments-offer">
      <h3>{text}</h3>
      <h5>{cost}</h5>
    </div>
  );
}
