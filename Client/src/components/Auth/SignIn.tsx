import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, loginTypes } from "../../utils/schemas";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "./registrationHelpers";
export default function SignIn() {
  const {
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
    const response = await signIn(data);
    if (response) {
      localStorage.setItem("jwt", response.jwt);
      console.log("sukces!!! ", response.jwt);
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
                className="wrapper__text-input"
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
                className="wrapper__text-input"
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
