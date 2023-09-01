
type CombinedDataType = Array<SeriesDataType | MovieDataType>;

type MovieDataType = {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  premiere: string;
  video: string | null;
  primaryImg: string;
  miniImg: string;
  hoverImg: string;
  logo: string;
  duration: number;
  categories: Category[];
  cast: Actor[];
  director: Director;
  ageCategory: number;
  transcription: boolean;
  producer: Producer;
};

type SeriesDataType = {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  premiere: string;
  primaryImg: string;
  miniImg: string;
  hoverImg: string;
  logo: string;
  categories: Category[];
  cast: Actor[];
  ageCategory: number;
  transcription: boolean;
  seasons: Season[];
  producer: Producer;
};

type Category = {
  id: number;
  name: string;
  filter: boolean;
};
type Actor = {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  image: string;
};

type Director = {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  image: string;
};
type Season = {
  id: number;
  title: string;
  number: string;
  episodes: Episode[];
};

type Episode = {
  id: number;
  title: string;
  number: number;
  premiere: string;
  description: string;
  director: Director;
  duration: number;
  miniImg: string;
  hoverImg: string;
  video: string;
};
type Slide = {
  id: number;
  title: string;
  movieId: number;
  movieType: string;
  image: string;
  logo: string;
};

type Producer = {
  id: number;
  name: string;
  image: string;
};

type noValidateFormProp = {
  email: string;
  password: string;
  optInSubscription?: boolean;
  paymentsOffer?: number;
  paymentsProcessing?: "creditCard" | "payPal";
};

type FormInput = {
  cardNameSname: string[];
  cardNumber: string;
  email: string;
  expiryDate: string;
  password: string;
  securityCode: string | number;
};

type CreateUserType = {
  email: string;
  password: string;
  optInSubscription?: boolean;
  username: string;
  payment: {
    cardName?: string;
    cardSname?: string;
    cardNumber?: string;
    securityCode?: number | string;
    expiryDate?: string;
    paymentsOffer: "year" | "month";
    paymentsProcessing: "creditCard" | "payPal";
  };
};


