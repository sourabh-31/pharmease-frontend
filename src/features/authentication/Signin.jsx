import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLoginUser } from "./useAuth";
import SpinnerMini from "../../ui/SpinnerMini";
import { useAuthContext } from "../../context/AuthContext";
import EyeLogo from "../../data/siginin-assets/eye.svg";
import EyeSlash from "../../data/siginin-assets/eyeSlash.svg";

function Signin() {
  const navigate = useNavigate();

  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;
  const { login } = useAuthContext();
  const { isLoading, loginUser } = useLoginUser();

  const [passwordVisible, setPasswordVisible] = useState(false);

  function handleSignUpClick() {
    navigate("/register");
  }

  function onSubmit(data) {
    loginUser(data, {
      onSuccess: () => {
        login();
        navigate("/dashboard", { replace: true });
        reset();
      },
    });
  }

  function onError(errors) {}

  function handlePasswordVisible() {
    setPasswordVisible((visible) => !visible);
  }

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
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
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
            <button
              className="absolute top-[35%] right-8"
              onClick={handlePasswordVisible}
              type="button"
            >
              {passwordVisible ? (
                <img src={EyeLogo} alt="eye" />
              ) : (
                <img src={EyeSlash} alt="eyeSlash" />
              )}
            </button>
          </div>
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

      <div className="flex justify-center mt-8">
        <button
          className="text-[#009099] font-bold"
          onClick={() => navigate("/forgot-password")}
        >
          Forgot Password?
        </button>
      </div>

      <p className="text-center font-bold mt-4">OR</p>

      <div className="flex items-center justify-center gap-1 mt-4 text-lg font-medium">
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
