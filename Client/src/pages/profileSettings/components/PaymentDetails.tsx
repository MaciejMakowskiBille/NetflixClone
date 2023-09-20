import Modal from "../../../components/modal/modal";

const PaymentDetails = ({
  data,
  setPaymentModalIsOpen,
}: {
  data: (PaymentResponseType["attributes"] & { id: number }) | null;
  setPaymentModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Modal
      btnText={["Edytuj"]}
      setModalIsOpen={setPaymentModalIsOpen}
      title="Szczegóły płatności"
      key={"płatności"}
    >
      <>
        <div className="modal__section">
          <h3>SPOSÓB PŁATNOŚCI:</h3>
          <p>
            {data?.paymentsProcessing === "payPal"
              ? "paypal"
              : "karta kredytowa"}
          </p>
        </div>
        <div className="modal__section">
          <h3>OKRES PŁATNOŚCI:</h3>
          <p>{data?.paymentsOffer ? "miesięcznie" : "rocznie"}</p>
        </div>
        <div className="modal__section">
          <h3>TWOJE DANE: </h3>
          {data?.paymentsProcessing !== "payPal" ? (
            <ul>
              <li>
                <p>imie i nazwisko: {data?.cardName + " " + data?.cardSname}</p>
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
      </>
    </Modal>
  );
};

export default PaymentDetails;
