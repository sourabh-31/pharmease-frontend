import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import SpinnerMini from "../../ui/SpinnerMini";
import { useForgotPassword } from "../authentication/useAuth";

function ForgotPassword() {
  const navigate = useNavigate();

  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;

  const { isLoading, forgotPassword } = useForgotPassword();

  console.log(isLoading);

  function onSubmit(data) {
    forgotPassword(data);
  }

  function onError(errors) {}

  return (
    <section className="mt-12">
      <div className="text-center text-4xl font-medium tracking-wide">
        <p>Forgot Password</p>
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

        <button
          className="rounded-full py-5 mt-5 text-white bg-[#01a768]"
          type="submit"
        >
          {isLoading ? <SpinnerMini /> : "Submit"}
        </button>
      </form>
    </section>
  );
}

export default ForgotPassword;
