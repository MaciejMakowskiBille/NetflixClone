export interface UserTypes {
  email: string;
  password: string;
  optInSubscription?: boolean;
  username: string;
}

export interface UserPaymentTypes {
  user: UserTypes;
  payment: paymentsTypes;
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

export interface displayArray {
  [index: number]: JSX.Element;
}

export interface modalTypes {
  success?: boolean;
  content?: string;
}
