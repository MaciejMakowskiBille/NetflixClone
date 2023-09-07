import Navigation from "../../components/Navigation/nav";
import { getAllUserData } from "../../utils/Gets";
import ProfilesMenu from "./components/ProfilesMenu";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { settingsSchema } from "../../utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import SettingsRow from "./components/SettingsRow";
import { changePassword, putUserData } from "../../utils/Puts";
import PasswordRow from "./components/PasswordRow";

const ProfileSettings = () => {
  const [clickedIndex, setClickedIndex] = useState<number>(-1);
  // const [successSubmit, setSuccessSubmit] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<AllUserDataResponseType | null>(
    null
  );
  const [inputIsOpen, setInputIsOpen] = useState<number>(-1);

  const {
    setError,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingsFormType>({
    mode: "onChange",
    defaultValues: {
      email: undefined,
      phoneNumber: undefined,
      currentPassword: undefined,
      password: undefined,
    },
    resolver: zodResolver(settingsSchema),
  });

  useEffect(() => {
    getAllUserData().then((response) => {
      setIsLoading(false);
      setUserData(response);
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

  const cleanSettingsData = (data: SettingsSchemaType) => {
    const keys: (keyof SettingsSchemaType)[] = Object.keys(data);
    let outputObj: SettingsSchemaType = {};
    keys.forEach((item) => {
      if (data[item] !== undefined) {
        outputObj[item] = data[item];
      }
    });

    return outputObj as SettingsFormType;
  };

  const resetForm = () => {
    reset({
      email: undefined,
      phoneNumber: undefined,
      currentPassword: undefined,
      password: undefined,
    });
    setInputIsOpen(-1);
  };

  // useEffect(() => {
  //   console.log(errors.email);
  // }, [errors.email]);

  const onSubmit = async (formData: SettingsSchemaType) => {
    const cleanedData: SettingsFormType = cleanSettingsData(formData);
    const keys = Object.keys(cleanedData) as (keyof SettingsFormType)[];
    const key = keys[0];
    console.log("key", key);
    console.log(cleanedData);
    try {
      if (key === "currentPassword" || key === "password") {
        let changePasswordData = cleanedData as ChangePasswordType;
        changePasswordData["passwordConfirmation"] = cleanedData.password!;
        console.log(cleanedData);
        // const response = await changePassword(changePasswordData);
      } else {
        const response = await putUserData(cleanedData);
        console.log(response);
      }

      // setSuccessSubmit(true);
      resetForm();
    } catch (error) {
      if (error instanceof Error) {
        if (key === "email") {
          setError("email", {
            type: "manual",
            message: "wybrany email jest już zajęty",
          });
        } else {
          setError(key, {
            type: "manual",
            message: "wprowadzono niewłaściwe dane",
          });
        }
      }
    }
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
                  <PasswordRow
                    data=""
                    errors={errors}
                    inputIsOpen={inputIsOpen}
                    index={2}
                    register={register}
                    resetForm={resetForm}
                    setInputIsOpen={setInputIsOpen}
                    key={"password"}
                  />
                  {/* <div
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
                  </div> */}
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
