export interface UserTypes {
  email: string;
  password: string;
  optInSubscription?: boolean;
  // paymentsOffer?: number;
  // paymentsProcessing?: "creditCard" | "payPal";
  // cardName?: string;
  // cardSname?: string;
  // cardNumber?: string;
  // expiryDate?: string;
  // securityCode?: string | number;
  username: string;
}

export interface UserPostResponseTypes {
  jwt: string;
  user: {
    id: number;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
    // cardName: string;
    // cardSname: string;
    // cardNumber: string;
    // securityCode: number;
    // expiryDate: string;
    // paymentsOffer: boolean;
    // paymentsProcessing: "creditCard" | "payPal";
    optInSubscription: boolean;
    username: string;
  };
}

export interface noValidateFormProp {
  email: string;
  password: string;
  optInSubscription?: boolean;
  paymentsOffer?: number;
  paymentsProcessing?: "creditCard" | "payPal";
}

export interface userCreationErrorType {
  fieldName: string;
  error: string;
}

export interface paymentsTypes {
  data: {
    cardName?: string;
    cardSname?: string;
    cardNumber?: string;
    securityCode?: number | string;
    expiryDate?: string;
    paymentsOffer: number;
    paymentsProcessing: "creditCard" | "payPal";
    user: number;
  };
}

export interface paymentsResponseTypes {
  attributes: {
    cardName: string;
    cardSname: string;
    cardNumber: string;
    securityCode: number;
    expiryDate: string;
    paymentsOffer: number;
    paymentsProcessing: "creditCard" | "payPal";
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}
