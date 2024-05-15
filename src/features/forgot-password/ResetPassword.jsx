import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SpinnerMini from "../../ui/SpinnerMini";
import { useResetPassword } from "../authentication/useAuth";

function ResetPassword() {
  const navigate = useNavigate();

  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;

  const { isLoading, resetPassword } = useResetPassword();

  const params = useParams();
  const token = params?.resetId;
  console.log(token);

  function onSubmit(data) {
    resetPassword(
      { token, password: data.password },
      {
        onSuccess: () => {
          navigate("/login");
        },
      }
    );
  }

  function onError(errors) {}

  return (
    <section className="mt-12">
      <div className="text-center text-4xl font-medium tracking-wide">
        <p>Reset Password</p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="flex flex-col w-[24rem] ml-auto mr-auto gap-5 mt-12"
      >
        <div className="w-full">
          <input
            type="text"
            placeholder="Enter new password"
            id="password"
            className="bg-[#efefef] py-5 px-8 rounded-full placeholder:text-[#827a7a] placeholder:text-base text-lg font-medium w-full"
            {...register("password", {
              required: "This Field is required",
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

export default ResetPassword;
