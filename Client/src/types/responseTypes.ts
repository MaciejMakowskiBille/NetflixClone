type MovieResponseType = {
  attributes: {
    title: string;
    description: string;
    longDescription: string;
    premiere: string;
    video: { data: MediaResponseType };
    primaryImg: { data: MediaResponseType };
    miniImg: { data: MediaResponseType };
    hoverImg: { data: MediaResponseType };
    logo: { data: MediaResponseType };
    duration: number;
    categories: { data: CategoryResponseType[] };
    cast: { data: ActorResponseType[] };
    director: { data: DirectorResponseType };
    ageCategory: number;
    transcription: boolean;
    producer: { data: ProducerResponseType };

    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
  id: number;
};

type SeriesResponseType = {
  attributes: {
    title: string;
    description: string;
    longDescription: string;
    premiere: string;
    primaryImg: { data: MediaResponseType };
    miniImg: { data: MediaResponseType };
    hoverImg: { data: MediaResponseType };
    logo: { data: MediaResponseType };
    categories: { data: CategoryResponseType[] };
    cast: { data: ActorResponseType[] };
    director: { data: DirectorResponseType };
    ageCategory: number;
    transcription: boolean;
    seasons: { data: SeasonResponseType[] };
    producer: { data: ProducerResponseType };

    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
  id: number;
};

type CategoryResponseType = {
  attributes: {
    name: string;
    filter: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
  id: number;
};

type ActorResponseType = {
  attributes: {
    firstName: string;
    lastName: string;
    birthDate: string;
    image: { data: MediaResponseType };

    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
  id: number;
};

type MediaResponseType = {
  attributes: {
    alternativeText?: string;
    caption?: string;
    ext: string;
    hash: string;
    height: number;
    width: number;
    mime: string;
    name: string;
    provider: string;
    size: number;
    url: string;

    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
  id: number;
};

type DirectorResponseType = {
  attributes: {
    firstName: string;
    lastName: string;
    birthDate: string;
    image: { data: MediaResponseType };

    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
  id: number;
};

type SeasonResponseType = {
  attributes: {
    title: string;
    number: string;
    episodes: { data: EpisodeResponseType[] };

    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
  id: number;
};

type EpisodeResponseType = {
  attributes: {
    title: string;
    number: number;
    premiere: string;
    description: string;
    director: { data: DirectorResponseType };
    duration: number;
    miniImg: { data: MediaResponseType };
    hoverImg: { data: MediaResponseType };
    video: { data: MediaResponseType };
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
  id: number;
};
type SliderResponseType = {
  attributes: {
    title: string;
    movieId: number;
    movieType: string;
    image: { data: MediaResponseType };
    logo: { data: MediaResponseType };

    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
  id: number;
};

type ProducerResponseType = {
  attributes: {
    name: string;
    image: { data: MediaResponseType };

    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
  id: number;
};

type PaymentsResponseType = {
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
};

type UserPostResponseType = {
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
};

// SignIn SignOut Response Type
type RegisterUserResponseType = {
  jwt: string;
  user: {
    id: number;
    phoneNumber: number;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
    optInSubscription: boolean;
    username: string;
  };
};

type UserResponseType = {
  id: number;
  username: string;
  email: string;
  optInSubscription: boolean;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  phoneNumber?: number;
  createdAt: string;
  updatedAt: string;
};

type PaymentResponseType = {
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
  id: number;
};

type ProfileResponseType = {
  attributes: {
    username: string;
    ageGroup: "kid" | "teen" | "adult";
    favorite_series?: {data: SeriesResponseType[]};
    favorite_films?: {data: MovieResponseType};
    avatar: MediaResponseType["attributes"]| null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
  id: number;
};


type AllUserDataResponseType = UserResponseType & {
  profiles: Array<ProfileResponseType["attributes"] & { id: number }> | [];
  payment: PaymentResponseType["attributes"] & {id: number} | null;
}

type PutUserResponseType = {
  id: number,
  email: string,
  phoneNumber: string,
  optInSubscription: boolean,
  createdAt: string,
  updatedAt: string,
}
