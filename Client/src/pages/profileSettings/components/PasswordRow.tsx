import { FieldErrors, UseFormRegister } from "react-hook-form";

function PasswordRow({
  inputIsOpen,
  register,
  setInputIsOpen,
  data,
  errors,
  resetForm,
  index,
}: {
  inputIsOpen: number;
  register: UseFormRegister<SettingsFormType>;
  setInputIsOpen: (value: React.SetStateAction<number>) => void;
  errors: FieldErrors<SettingsFormType>;
  resetForm: () => void;
  data: string | undefined;
  index: number;
}) {
  const type = "currentPassword";
  let filedName;
  if (type === "currentPassword") {
    filedName = "hasło";
  }

  return (
    <div>
      {inputIsOpen == index ? (
        <div className="settings-item__row">
          <div className="settings-item__input">
            <div>
              <input
                type="text"
                placeholder="bieżące hasło"
                className="wrapper__text-input wrapper__text-input--modifySettings"
                {...register("currentPassword")}
                autoFocus
              />
              {errors[type] && (
                <p className="error-message error-message--settings">
                  {errors[type]?.message}
                </p>
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="nowe hasło"
                className="wrapper__text-input wrapper__text-input--modifySettings"
                {...register("password")}
              />
              {errors["password"] && (
                <p className="error-message error-message--settings">
                  {errors["password"]?.message}
                </p>
              )}
            </div>
          </div>
          <div className="settings-item__buttons">
            <button className="textButton" onClick={resetForm}>
              Anuluj
            </button>
            <button type="submit" className="textButton">
              Zapisz
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="settings-item__row">
            <p>{data ? data : "nie ustawiono"}</p>
            <button
              className="textButton"
              onClick={() => setInputIsOpen(index)}
            >
              zmień {filedName}
            </button>
          </div>
          <div className="settings-item__row">
            <p>{data ? data : "nie ustawiono"}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default PasswordRow;
