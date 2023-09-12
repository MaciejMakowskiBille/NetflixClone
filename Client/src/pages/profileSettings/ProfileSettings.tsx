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
import { cleanSettingsData } from "../../utils/helpers";
import PaymentDetails from "./components/PaymentDetails";
import Modal from "./components/modal";

const ProfileSettings = () => {
  const [clickedIndex, setClickedIndex] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<AllUserDataResponseType | null>(
    null
  );
  const [paymentsOfferText, setPaymentsOfferText] = useState<string>("");
  const [inputIsOpen, setInputIsOpen] = useState<number>(-1);
  const [paymentModalIsOpen, setPaymentModalIsOpen] = useState<boolean>(false);
  const [removeProfileModalIsOpen, setRemoveProfileModalIsOpen] =
    useState<boolean>(false);
  const [reload, setReload] = useState(false);

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
    const offer = userData?.payment?.paymentsOffer;
    let outputString: string;
    if (offer) {
      outputString = "<p>Plan miesięczny</p>" + "<p>29.99zł/miesiąc</p>";
    } else {
      outputString = "<p>Plan roczny</p>" + "<p>289.99zł/rok</p>";
    }
    setPaymentsOfferText(outputString);
  }, [reload]);

  useEffect(() => {
    getAllUserData().then((response) => {
      setIsLoading(false);
      setUserData(response);
    });
  }, [reload]);

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
        // console.log(cleanedData);
        const response = await changePassword(changePasswordData);
        console.log("sukces", response);
      } else {
        const response = await putUserData(cleanedData);
        setReload((prev) => !prev);
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
        <Modal title="Uwaga" content="Czy napewno chcesz usunąć profil?">
          <button className="button-secondary">Zatwierdź</button>
          <button className="button-secondary">Anuluj</button>
        </Modal>
      )}
    </form>
  );
};

export default ProfileSettings;
