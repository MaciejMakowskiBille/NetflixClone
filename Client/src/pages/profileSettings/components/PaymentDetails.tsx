const PaymentDetails = ({
  data,
  setPaymentModalIsOpen,
}: {
  data: (PaymentResponseType["attributes"] & { id: number }) | null;
  setPaymentModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  function handleCloseModal() {
    setPaymentModalIsOpen(false);
  }
  return (
    <>
      <div className="backdrop" />
      <div className="payment-details">
        <div className="payment-details__header">
          <h2 className="title">Szczegóły płatności</h2>
          <button
            className="closeButton icon right"
            onClick={handleCloseModal}
          />
        </div>
        <div className="payment-details__content">
          <div className="payment-details__section">
            <h3>SPOSÓB PŁATNOŚCI:</h3>
            <p>{data?.paymentsProcessing}</p>
          </div>
          <div className="payment-details__section">
            <h3>OKRES PŁATNOŚCI:</h3>
            <p>{data?.paymentsOffer ? "miesięcznie" : "rocznie"}</p>
          </div>
          <div className="payment-details__section">
            <h3>TWOJE DANE: </h3>
            <ul>
              <li>imie i nazwisko: {data?.cardName + " " + data?.cardSname}</li>
              <li>numer konta: {data?.cardNumber}</li>
              <li>kod bezpieczeństwa: {data?.securityCode}</li>
              <li>data ważności: {data?.expiryDate}</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentDetails;
