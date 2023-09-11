import { FieldErrors, UseFormRegister } from "react-hook-form";
// import { AllUserDataResponseType } from "../../../types/responseTypes";
export default function SettingsRow({
  inputIsOpen,
  register,
  setInputIsOpen,
  data,
  type,
  errors,
  resetForm,
  index,
}: {
  inputIsOpen: number;
  register: UseFormRegister<SettingsFormType>;
  setInputIsOpen: (value: React.SetStateAction<number>) => void;
  errors: FieldErrors<SettingsFormType>;
  resetForm: () => void;
  type: "email" | "phoneNumber";
  data: string | undefined;
  index: number;
}) {
  let filedName;
  if (type === "email") {
    filedName = "email";
  } else if (type === "phoneNumber") {
    filedName = "numer";
  }

  return (
    <div>
      {inputIsOpen == index ? (
        <div className="settings-item__row">
          <div className="settings-item__inputs">
            <input
              type="text"
              placeholder={data}
              className="wrapper__text-input wrapper__text-input--modifySettings"
              {...register(type)}
              autoFocus
            />
            {errors[type] && (
              <p className="error-message">{errors[type]?.message}</p>
            )}
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
        <div className="settings-item__row">
          <p>{data ? data : "nie ustawiono"}</p>
          <button className="textButton" onClick={() => setInputIsOpen(index)}>
            zmień {filedName}
          </button>
        </div>
      )}
    </div>
  );
}
