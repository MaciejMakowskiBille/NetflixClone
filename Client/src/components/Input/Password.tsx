import eye from "../../imgs/icons/eye_icon.svg";
import eyeSlash from "../../imgs/icons/eye_slash.svg";
import { PasswordProps } from "../../types/propsType";

const Password = ({
  passwordShown,
  setPasswordShown,
  register,
  handleChange,
  className,
  errors,
}: PasswordProps) => {
  const tagglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const passwordIcon = passwordShown ? eye : eyeSlash;
  // if(register typeof UseFormRegister<{ email: string; password: string; }>){
  return (
    <div>
      <div className="password-input">
        <input
          className={className}
          type={!passwordShown ? "password" : "text"}
          {...register!("password")}
          name="password"
          placeholder="hasło"
          onChange={handleChange}
        />
        <img
          src={passwordIcon}
          className="password-icon"
          onClick={tagglePassword}
        />
      </div>
      {errors?.password && (
        <p className="error-message">{errors.password?.message}</p>
      )}
    </div>
  );
  // }
};

export default Password;
