import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, loginTypes } from "../../utils/schemas";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "./registrationHelpers";
export default function SignIn() {
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

  const onSubmit: SubmitHandler<loginTypes> = async (data) => {
    console.log(data);
    try {
      const response = await signIn(data);
      if (response) {
        localStorage.setItem("jwt", response.jwt);
        console.log("sukces!!! ", response.jwt);
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
      // console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
                // className="wrapper__text-input"
                type="email"
                placeholder="email"
                {...register("email")}
                name="email"
              />
              {errors?.email && (
                <p className="error-message">{errors.email?.message}</p>
              )}
            </div>
            <div className="input">
              <input
                className={
                  errors?.password
                    ? "wrapper__text-input error"
                    : "wrapper__text-input"
                }
                // className="wrapper__text-input"
                type="password"
                placeholder="password"
                {...register("password")}
                name="password"
              />
              {errors?.password && (
                <p className="error-message">{errors.password?.message}</p>
              )}
            </div>
            <p>Nie pamiętam hasła!</p>
          </div>
          <div className="action">
            <button className="button-primary" type="submit">
              Zaloguj
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
