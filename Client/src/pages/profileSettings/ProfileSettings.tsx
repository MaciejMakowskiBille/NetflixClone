import Navigation from "../../components/Navigation/nav";
import { getAllUserData } from "../../utils/Gets";
import ProfilesMenu from "./components/ProfilesMenu";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { settingsSchema } from "../../utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import SettingsRow from "./components/SettingsRow";
import { changePassword, putUserData } from "../../utils/Puts";
import { cleanSettingsData } from "../../utils/helpers";
import PaymentDetails from "./components/PaymentDetails";
import Modal from "../../components/modal/Modal";
import { removeProfile } from "../../utils/Deletes";

const ProfileSettings = () => {
  const [clickedIndex, setClickedIndex] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<AllUserDataResponseType | null>(
    null
  );
  const [removeProfileMessage, setRemoveProfileMessage] = useState<string>("");
  const [paymentsOfferText, setPaymentsOfferText] = useState<string>("");
  const [inputIsOpen, setInputIsOpen] = useState<number>(-1);
  const [paymentModalIsOpen, setPaymentModalIsOpen] = useState<boolean>(false);
  const [removeProfileModalIsOpen, setRemoveProfileModalIsOpen] =
    useState<boolean>(false);

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

  async function loadUserData() {
    await getAllUserData().then((response) => {
      setIsLoading(false);
      setUserData(response);
      if (response?.payment?.paymentsOffer) {
        setPaymentsOfferText("<p>Plan miesięczny</p><p>29.99zł/miesiąc</p>");
      } else {
        setPaymentsOfferText("<p>Plan roczny</p><p>289.99zł/rok</p>");
      }
    });
  }

  useEffect(() => {
    loadUserData();
  }, []);

  const resetForm = () => {
    reset({
      email: undefined,
      phoneNumber: undefined,
      currentPassword: undefined,
      password: undefined,
    });
    setInputIsOpen(-1);
  };

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
        const response = await changePassword(changePasswordData);
        console.log("sukces", response);
      } else {
        const response = await putUserData(cleanedData);
        loadUserData();
        console.log(response);
      }
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

  function handlePaymentDetailsClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setPaymentModalIsOpen(true);
  }

  const removeYourProfile = () => {
    if (userData?.profiles.length! > 1) {
      removeProfile(clickedIndex);
      setRemoveProfileModalIsOpen(false);
    } else {
      setRemoveProfileMessage("Wybrana operacja nie jest możliwa.");
    }
  };

  return (
    <form className="all-user-settings" onSubmit={handleSubmit(onSubmit)}>
      <div className="appBackground">
        <Navigation />
        {!isLoading && userData && (
          <main className="settings">
            <div className="settings__form">
              <h3 className="settings__header">Konto</h3>
              <div className="settings-item">
                <div className="settings-item__title">
                  <p className="label">DANE KONTA</p>
                </div>

                <div className="settings-item__content">
                  <SettingsRow
                    data={userData.email}
                    index={0}
                    inputIsOpen={inputIsOpen}
                    setInputIsOpen={setInputIsOpen}
                    type="email"
                    resetForm={resetForm}
                    key={"email"}
                  >
                    <div>
                      <input
                        type="text"
                        placeholder={userData.email}
                        className="wrapper__text-input--modifySettings"
                        {...register("email")}
                        autoFocus
                      />
                      {errors["email"] && (
                        <p className="error-message error-message--settings">
                          {errors["email"]?.message}
                        </p>
                      )}
                    </div>
                  </SettingsRow>
                  <SettingsRow
                    data={userData.phoneNumber?.toString()}
                    index={1}
                    inputIsOpen={inputIsOpen}
                    setInputIsOpen={setInputIsOpen}
                    resetForm={resetForm}
                    type="phoneNumber"
                    key={"phoneNumber"}
                  >
                    <div>
                      <input
                        type="text"
                        placeholder={
                          !userData.phoneNumber
                            ? ""
                            : userData.phoneNumber?.toString()
                        }
                        className="wrapper__text-input--modifySettings"
                        {...register("phoneNumber")}
                        autoFocus
                      />
                      {errors["phoneNumber"] && (
                        <p className="error-message error-message--settings">
                          {errors["phoneNumber"]?.message}
                        </p>
                      )}
                    </div>
                  </SettingsRow>
                  <SettingsRow
                    data=""
                    index={2}
                    inputIsOpen={inputIsOpen}
                    setInputIsOpen={setInputIsOpen}
                    resetForm={resetForm}
                    type="currentPassword"
                    key={"password"}
                  >
                    <div
                      className={
                        errors["currentPassword"]
                          ? "inputWithError--open"
                          : "inputWithError"
                      }
                    >
                      <input
                        type="text"
                        placeholder="bieżące hasło"
                        className="wrapper__text-input--modifySettings"
                        {...register("currentPassword")}
                        autoFocus
                      />
                      {errors["currentPassword"] && (
                        <p className="error-message error-message--settings">
                          {errors["currentPassword"]?.message}
                        </p>
                      )}
                    </div>
                    <div
                      className={
                        errors["password"]
                          ? "inputWithError--open"
                          : "inputWithError"
                      }
                    >
                      <input
                        type="text"
                        placeholder="nowe hasło"
                        className="wrapper__text-input--modifySettings"
                        {...register("password")}
                      />
                      {errors["password"] && (
                        <p className="error-message error-message--settings">
                          {errors["password"]?.message}
                        </p>
                      )}
                    </div>
                  </SettingsRow>
                </div>
              </div>

              <div className="settings-item">
                <div className="settings-item__title">
                  <p className="label">ROZLICZENIE</p>
                </div>

                <div className="settings-item__content">
                  <div className="settings-item__row">
                    <div
                      className="offer"
                      dangerouslySetInnerHTML={{ __html: paymentsOfferText }}
                    ></div>

                    <button
                      className="textButton offer"
                      onClick={handlePaymentDetailsClick}
                    >
                      szczegóły rozliczenia
                    </button>
                  </div>
                </div>
              </div>
              <div className="settings-item">
                <div className="settings-item__title">
                  <p className="label">PROFILE I KONTROLA RODZICIELSKA</p>
                </div>

                <div className="settings-item__content">
                  <div className="settings-item__row">
                    <p></p>
                    <button
                      className="textButton"
                      onClick={(e) => e.preventDefault()}
                    >
                      dodaj użytkownika
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <ul className="profilesMenu">
              <ProfilesMenu
                data={userData.profiles}
                clickedIndex={clickedIndex}
                setClickedIndex={setClickedIndex}
                setRemoveProfileModalIsOpen={setRemoveProfileModalIsOpen}
              />
            </ul>
          </main>
        )}
      </div>
      {paymentModalIsOpen && (
        <PaymentDetails
          data={userData?.payment!}
          setPaymentModalIsOpen={setPaymentModalIsOpen}
        />
      )}

      {removeProfileModalIsOpen && (
        <Modal
          title="Uwaga"
          btnText={["Tak, chcę"]}
          setModalIsOpen={setRemoveProfileModalIsOpen}
          onSubmit={removeYourProfile}
        >
          <div className="inputWithError">
            <p>Czy na pewno chcesz usunąc profil?</p>
            {removeProfileMessage && (
              <p className="error-message error-message--settings">
                {removeProfileMessage}
              </p>
            )}
          </div>
        </Modal>
      )}
    </form>
  );
};

export default ProfileSettings;
