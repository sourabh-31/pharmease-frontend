import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCreateUser } from "./useAuth";
import SpinnerMini from "../../ui/SpinnerMini";
import { useAuthContext } from "../../context/AuthContext";
import EyeLogo from "../../data/siginin-assets/eye.svg";
import EyeSlash from "../../data/siginin-assets/eyeSlash.svg";

function Signup() {
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;

  const { login } = useAuthContext();

  const { isCreating, createUser } = useCreateUser();

  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);

  function handleSignInClicked() {
    navigate("/login");
  }

  function onSubmit(data) {
    createUser(data, {
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
    <section className="mt-8">
      <div className="text-center text-4xl font-medium tracking-wide">
        <p>Sign up</p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="flex flex-col w-[40rem] ml-auto mr-auto gap-5 mt-12"
      >
        <div className="flex items-center gap-4">
          <div className="w-full">
            <input
              type="text"
              placeholder="Enter your first name"
              id="ownerFirstName"
              className="bg-[#efefef] py-5 px-8 rounded-full placeholder:text-[#827a7a] placeholder:text-base text-lg font-medium w-full"
              {...register("ownerFirstName", {
                required: "This Field is required",
              })}
            />
            {errors?.ownerFirstName?.message && (
              <div className="text-[#b91c1c] ml-4 mt-2">
                {errors?.ownerFirstName?.message}
              </div>
            )}
          </div>

          <div className="w-full">
            <input
              type="text"
              placeholder="Enter your last name"
              id="ownerLastName"
              className="bg-[#efefef] py-5 px-8 rounded-full placeholder:text-[#827a7a] placeholder:text-base text-lg font-medium w-full"
              {...register("ownerLastName", {
                required: "This Field is required",
              })}
            />
            {errors?.ownerLastName?.message && (
              <div className="text-[#b91c1c] ml-4 mt-2">
                {errors?.ownerLastName?.message}
              </div>
            )}
          </div>
        </div>

        <div className="w-full">
          <input
            type="text"
            placeholder="Enter your pharmacy name"
            id="pharmacyName"
            className="bg-[#efefef] py-5 px-8 rounded-full placeholder:text-[#827a7a] placeholder:text-base text-lg font-medium w-full"
            {...register("pharmacyName", {
              required: "This Field is required",
            })}
          />
          {errors?.pharmacyName?.message && (
            <div className="text-[#b91c1c] ml-4 mt-2">
              {errors?.pharmacyName?.message}
            </div>
          )}
        </div>

        <div className="w-full">
          <input
            type="text"
            placeholder="Enter your full address"
            id="address"
            className="bg-[#efefef] py-5 px-8 rounded-full placeholder:text-[#827a7a] placeholder:text-base text-lg font-medium w-full"
            {...register("address", {
              required: "This Field is required",
            })}
          />
          {errors?.address?.message && (
            <div className="text-[#b91c1c] ml-4 mt-2">
              {errors?.address?.message}
            </div>
          )}
        </div>

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
          {!isCreating ? "Sign up" : <SpinnerMini />}
        </button>
      </form>
      <div className="flex items-center justify-center gap-1 mt-10 text-lg font-medium">
        <p>Already have an account?</p>
        <button
          className="font-bold text-[#009099]"
          onClick={handleSignInClicked}
          type="button"
        >
          Sign in
        </button>
      </div>
    </section>
  );
}

export default Signup;
