import { ReactNode } from "react";

export default function SettingsRow({
  inputIsOpen,

  setInputIsOpen,
  data,
  type,
  children,
  resetForm,
  index,
}: {
  inputIsOpen: number;

  setInputIsOpen: (value: React.SetStateAction<number>) => void;
  children: ReactNode;
  resetForm: () => void;
  type: "email" | "phoneNumber" | "currentPassword";
  data: string | undefined;
  index: number;
}) {
  let filedName;
  if (type === "email") {
    filedName = "email";
  } else if (type === "phoneNumber") {
    filedName = "numer";
  } else if (type === "currentPassword") {
    filedName = "hasło";
  }

  return (
    <div>
      {inputIsOpen == index ? (
        <div className="settings-item__row">
          <div className="settings-item__inputs">{children}</div>
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
          {type === "currentPassword" ? (
            <div className="settings-item__password-fields">
              <div className="settings-item__field"></div>
              <div className="settings-item__field"></div>
            </div>
          ) : (
            <p>{data ? data : "nie ustawiono"}</p>
          )}
          <button className="textButton" onClick={() => setInputIsOpen(index)}>
            zmień {filedName}
          </button>
        </div>
      )}
    </div>
  );
}
