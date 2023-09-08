import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../utils/schemas";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "../../utils/Posts";
import { useNavigate } from "react-router-dom";
import { useSignedInContext } from "../../providers/signedInProvider";
import Password from "../../components/Input/Password";
import { useState } from "react";

export default function SignIn() {
  const navigate = useNavigate();
  const signInContext = useSignedInContext();

  const {
    setError,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<SignInType> = async (data) => {
    try {
      const response = await signIn(data);
      if (response) {
        signInContext.setIsSignedIn(true);
        navigate("/profile");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError("password", {
          type: "manual",
          message: error.message,
        });
        setError("email", {
          type: "manual",
          message: "",
        });
      }
    }
  };

  const [passwordShown, setPasswordShown] = useState<boolean>(false);

  const classNameText = errors?.password
    ? "wrapper__text-input error"
    : "wrapper__text-input";

  return (
    <form className="form-wrapper" onSubmit={handleSubmit(onSubmit)}>
      <div className="black-background">
        <div className="wrapper">
          <div className="wrapper__header">
            <h1>Zaloguj się</h1>
          </div>

          <div className="content">
            <div className="input">
              <input
                className={
                  errors?.email
                    ? "wrapper__text-input error"
                    : "wrapper__text-input"
                }
                type="email"
                placeholder="email"
                {...register("email")}
                name="email"
              />
              {errors?.email && (
                <p className="error-message">{errors.email?.message}</p>
              )}
            </div>
            <Password
              className={classNameText}
              errors={errors}
              passwordShown={passwordShown}
              setPasswordShown={setPasswordShown}
              register={register}
            />
            <p>Nie pamiętam hasła!</p>
          </div>
          <div className="action">
            <button className="form-button button-primary" type="submit">
              Zaloguj
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
