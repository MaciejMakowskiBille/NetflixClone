export interface FormTypes {
  email: string;
  password: string;
  optInSubscription?: boolean;
  paymentsOffer?: number;
  paymentsProcessing?: "creditCard" | "payPal";
  cardName?: string;
  cardSname?: string;
  cardNumber?: string;
  expiryDate?: string;
  securityCode?: number;
}

export interface UserCreationErrorType {
  fieldName: string;
  error: string;
}
