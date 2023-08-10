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
  username: string;
}

export interface noValidateFormProp {
  optInSubscription?: boolean;
  paymentsOffer?: number;
  paymentsProcessing?: "creditCard" | "payPal";
}

export interface UserCreationErrorType {
  fieldName: string;
  error: string;
}
