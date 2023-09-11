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
            <p>
              {data?.paymentsProcessing === "payPal"
                ? "paypal"
                : "karta kredytowa"}
            </p>
          </div>
          <div className="payment-details__section">
            <h3>OKRES PŁATNOŚCI:</h3>
            <p>{data?.paymentsOffer ? "miesięcznie" : "rocznie"}</p>
          </div>
          <div className="payment-details__section">
            <h3>TWOJE DANE: </h3>
            {data?.paymentsProcessing !== "payPal" ? (
              <ul>
                <li>
                  <p>
                    imie i nazwisko: {data?.cardName + " " + data?.cardSname}
                  </p>
                </li>
                <li>
                  <p>numer konta: {data?.cardNumber}</p>
                </li>
                <li>
                  <p>kod bezpieczeństwa: {data?.securityCode}</p>
                </li>
                <li>
                  <p>data ważności: {data?.expiryDate}</p>
                </li>
              </ul>
            ) : (
              <div>
                <p>
                  <a>Paypal</a>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentDetails;
