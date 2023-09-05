import Navigation from "../../components/Navigation/nav";
import { getAllUserData } from "../../utils/Gets";
import ProfilesMenu from "./components/ProfilesMenu";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { settingsSchema } from "../../utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import SettingsRow from "./components/SettingsRow";

const UserData: AllUserDataResponseType = {
  id: 28,
  username: "example",
  email: "example@domain.com",
  provider: "local",
  confirmed: true,
  blocked: false,
  phoneNumber: 123123123,
  createdAt: "2023-08-21T20:10:51.287Z",
  updatedAt: "2023-08-22T16:44:49.104Z",
  optInSubscription: true,
  payment: {
    id: 1,
    cardNumber: "1234123412340000",
    cardName: "Stanisław",
    cardSname: "Olszak",
    expiryDate: "12/24",
    securityCode: 123,
    paymentsProcessing: "creditCard",
    paymentsOffer: 1,
    createdAt: "2023-08-22T08:03:54.758Z",
    updatedAt: "2023-08-22T08:03:54.758Z",
    publishedAt: "2023-08-22T08:03:54.755Z",
  },

  profiles: [
    {
      id: 2,
      username: "Jan Kowalski",
      ageGroup: "teen",
      createdAt: "2023-08-22T08:05:11.664Z",
      updatedAt: "2023-08-22T15:45:03.003Z",
      publishedAt: "2023-08-22T15:45:02.997Z",
      avatar: null,
    },
    {
      id: 1,
      username: "StachuDev",
      ageGroup: "kid",
      createdAt: "2023-08-21T21:03:54.656Z",
      updatedAt: "2023-08-22T15:43:05.649Z",
      publishedAt: "2023-08-22T15:43:05.647Z",
      avatar: {
        name: "av1.png",
        width: 50,
        height: 50,
        hash: "av1_394c315578",
        ext: ".png",
        mime: "image/png",
        size: 1.12,
        url: "/uploads/av1_394c315578.png",
        publishedAt: " asdas",
        provider: "local",
        createdAt: "2023-08-21T21:03:08.956Z",
        updatedAt: "2023-08-21T21:03:42.788Z",
      },
    },
    {
      id: 3,
      username: "Olaola",
      ageGroup: "adult",
      createdAt: "2023-08-22T16:48:42.394Z",
      updatedAt: "2023-08-22T16:48:42.394Z",
      publishedAt: "2023-08-22T16:48:42.391Z",
      avatar: null,
    },
  ],
};

const ProfileSettings = () => {
  const [clickedIndex, setClickedIndex] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<AllUserDataResponseType | null>(
    null
  );
  const [inputIsOpen, setInputIsOpen] = useState<number>(-1);
  // const [inputData, setInputData] = useState<SettingsSchemaType>({
  //   phoneNumber: undefined,
  //   email: "",
  // });

  const {
    clearErrors,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingsSchemaType>({
    mode: "onChange",
    // reValidateMode: "onChange",
    defaultValues: {
      email: "",
      phoneNumber: undefined,
    },
    resolver: zodResolver(settingsSchema),
  });

  useEffect(() => {
    getAllUserData().then((response) => {
      setIsLoading(false);
      setUserData(response);

      console.log(response);
    });
  }, []);

  const [paymentsOfferText, setPaymentsOfferText] = useState<string>("");

  useEffect(() => {
    const offer = userData?.payment?.paymentsOffer;
    let outputString: string;
    if (offer) {
      outputString = "Plan miesięczny\n" + "29.99zł/miesiąc";
    } else {
      outputString = "Plan roczny\n" + "289.99zł/rok";
    }
    setPaymentsOfferText(outputString);
  }, [userData?.payment?.paymentsOffer]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value;
    console.log(e.target.name);
    // setInputData((prev) => {
    //   []
    // });
    // console.log(e.target.value);
  }

  const cleanSettingsData = (data: SettingsSchemaType) => {
    const values = Object.values(data);
    const keys = Object.keys(data);
    const output = values.map((item, index) => {
      if (item.length) {
        const key = keys[index];
        if (key === "phoneNumber") {
          return { phoneNumber: item };
        } else if (key === "email") {
          return { email: item };
        } else {
          return { password: item };
        }
      }
    });
  };

  const resetForm = () => {
    reset({
      email: "",
      phoneNumber: undefined,
    });
    setInputIsOpen(-1);
  };

  // useEffect(() => {
  //   console.log(errors.email);
  // }, [errors.email]);

  // useEffect(() => clearErrors(), []);

  const onSubmit = (formData: SettingsSchemaType) => {
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="appBackground">
        <Navigation />
        {!isLoading && userData && (
          <main className="settings">
            <div className="settings__form">
              <h3 className="settings__header">Konto</h3>
              <div className="settings-item">
                <div className="settings-item__title">
                  <p>DANE KONTA</p>
                </div>

                <div className="settings-item__content">
                  <SettingsRow
                    data={userData.email}
                    errors={errors}
                    inputIsOpen={inputIsOpen}
                    index={0}
                    register={register}
                    resetForm={resetForm}
                    setInputIsOpen={setInputIsOpen}
                    type="email"
                    key={"email"}
                  />
                  <SettingsRow
                    data={userData.phoneNumber?.toString()}
                    errors={errors}
                    inputIsOpen={inputIsOpen}
                    index={1}
                    register={register}
                    resetForm={resetForm}
                    setInputIsOpen={setInputIsOpen}
                    type="phoneNumber"
                    key={"phoneNumber"}
                  />
                  {/* <div
                    className="settings-item__row"
                    onBlur={() => setInputIsOpen(-1)}
                  >
                    {inputIsOpen == 1 ? (
                      <input
                        type="number"
                        placeholder="np. 123123123"
                        className="wrapper__text-input wrapper__text-input--modifySettings"
                        {...register("phoneNumber")}
                        onChange={handleChange}
                        autoFocus
                      />
                    ) : (
                      <p>
                        {userData.phoneNumber
                          ? " +48" + userData.phoneNumber
                          : " nie ustawiono"}
                      </p>
                    )}

                    <button
                      type="submit"
                      className="textButton"
                      onClick={() => setInputIsOpen(1)}
                    >
                      zmień numer telefonu
                    </button>
                  </div> */}
                  <div
                    className="settings-item__row"
                    // onBlur={() => setInputIsOpen(-1)}
                  >
                    <p></p>
                    <button
                      className="textButton"
                      onClick={() => setInputIsOpen(2)}
                    >
                      zmień hasło
                    </button>
                  </div>
                </div>
              </div>

              <div className="settings-item">
                <div className="settings-item__title">
                  <p>ROZLICZENIE</p>
                </div>

                <div className="settings-item__content">
                  <div className="settings-item__row settings-item__row--offer">
                    <p className="offer">{paymentsOfferText}</p>

                    <button
                      className="textButton offer"
                      onClick={() => setInputIsOpen(3)}
                    >
                      szczegóły rozliczenia
                    </button>
                  </div>
                </div>
              </div>
              <div className="settings-item">
                <div className="settings-item__title">
                  <p>PROFILE I KONTROLA RODZICIELSKA</p>
                </div>

                <div className="settings-item__content settings-item__content--profiles">
                  <div className="settings-item__row">
                    <p></p>
                    <button className="textButton">dodaj użytkownika</button>
                  </div>
                </div>
              </div>
            </div>
            <ul className="profilesMenu">
              <ProfilesMenu
                data={userData.profiles}
                clickedIndex={clickedIndex}
                setClickedIndex={setClickedIndex}
              />
            </ul>
          </main>
        )}
      </div>
    </form>
  );
};

export default ProfileSettings;
