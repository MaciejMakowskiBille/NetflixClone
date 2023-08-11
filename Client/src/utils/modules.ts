
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
  securityCode?: string|number;
  username: string;
}

export interface UserPostResponseTypes {
  jwt: string;
  user : {
      id: number,
      email: string,
      provider: string,
      confirmed: boolean,
      blocked: boolean,
      createdAt: string,
      updatedAt: string,
      cardName: string,
      cardSname: string,
      cardNumber: string,
      securityCode: number,
      expiryDate: string,
      paymentsOffer: boolean,
      paymentsProcessing: "creditCard" | "payPal",
      optInSubscription: boolean,
      username: string,
  }
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
