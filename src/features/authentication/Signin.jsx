import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLoginUser } from "./useAuth";
import SpinnerMini from "../../ui/SpinnerMini";

function Signin() {
  const navigate = useNavigate();

  const { register, handleSubmit, reset, formState, setValue } = useForm();
  const { errors } = formState;

  const { isLoading, loginUser } = useLoginUser();

  function handleSignUpClick() {
    navigate("/register");
  }

  function onSubmit(data) {
    loginUser(data, {
      onSuccess: () => {
        navigate("/dashboard", { replace: true });
      },
    });
  }

  function onError(errors) {}

  return (
    <section className="mt-12">
      <div className="text-center text-4xl font-medium tracking-wide">
        <p>Sign in</p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="flex flex-col w-[24rem] ml-auto mr-auto gap-5 mt-12"
      >
        <div className="w-full">
          <input
            type="text"
            placeholder="Enter your email"
            id="email"
            className="bg-[#efefef] py-5 px-8 rounded-full placeholder:text-[#827a7a] placeholder:text-base text-lg font-medium w-full"
            {...register("email", {
              required: "This Field is required",
              pattern: {
                value: /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/,
                message: "Please enter a valid email address",
              },
            })}
          />
          {errors?.email?.message && (
            <div className="text-[#b91c1c] ml-4 mt-2">
              {errors?.email?.message}
            </div>
          )}
        </div>
        <div className="w-full">
          <input
            type="text"
            placeholder="Enter your password"
            id="password"
            className="bg-[#efefef] py-5 px-8 rounded-full placeholder:text-[#827a7a] placeholder:text-base text-lg font-medium w-full"
            {...register("password", {
              required: "This Field is required",
              minLength: {
                value: 8,
                message: "Password should atleast 8 characters",
              },
            })}
          />
          {errors?.password?.message && (
            <div className="text-[#b91c1c] ml-4 mt-2">
              {errors?.password?.message}
            </div>
          )}
        </div>
        <button
          className="rounded-full py-5 mt-5 text-white bg-[#01a768]"
          type="submit"
        >
          {isLoading ? <SpinnerMini /> : "Sign in"}
        </button>
      </form>
      <div className="flex items-center justify-center gap-1 mt-10 text-lg font-medium">
        <p>Didn&apos;t have an account?</p>
        <button
          className="font-bold text-[#009099]"
          onClick={handleSignUpClick}
        >
          Sign up
        </button>
      </div>
    </section>
  );
}

export default Signin;
