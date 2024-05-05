import CustomerRow from "../../ui/CustomerRow";
import styles from "../../styles/AddCustomerForm.module.css";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import { useCreateCustomer } from "./useCustomerAction";

function AddCustomerForm({ onCloseModal }) {
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;
  const { isCreating, createCustomer } = useCreateCustomer();

  function onSubmit(data) {
    // console.log(data);
    createCustomer(data, {
      onSuccess: () => {
        reset();
        onCloseModal();
      },
    });
  }

  function onError(errors) {
    // console.error(errors);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <div className="flex flex-col gap-4 w-[50rem] mt-6">
        <CustomerRow label="Name" error={errors?.name?.message}>
          <input
            type="text"
            id="name"
            className={styles.input}
            {...register("name", {
              required: "This Field is required",
            })}
          />
        </CustomerRow>

        <CustomerRow
          label="Mobile Number"
          error={errors?.mobileNumber?.message}
        >
          <input
            type="text"
            id="mobileNumber"
            className={styles.input}
            {...register("mobileNumber", {
              valueAsNumber: true,
              required: "This Field is required",
              validate: {
                isNumber: (value) =>
                  !isNaN(parseFloat(value)) || "Please enter a valid number",
                isTenDigits: (value) =>
                  /^\d{10}$/.test(value) || "Mobile number must be 10 digits",
              },
            })}
          />
        </CustomerRow>

        <CustomerRow label="Address" error={errors?.address?.message}>
          <input
            type="text"
            id="address"
            className={styles.input}
            {...register("address", {
              required: "This Field is required",
            })}
          />
        </CustomerRow>

        <CustomerRow label="Sex" error={errors?.sex?.message}>
          <select
            id="sex"
            className={styles.input}
            {...register("sex", {
              required: "This Field is required",
            })}
          >
            <option value="">Select an option</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </CustomerRow>
      </div>

      <div className="flex justify-end mt-12 gap-6">
        <Button
          textColor="#000"
          border={true}
          onClick={onCloseModal}
          type="button"
          disabled={isCreating}
        >
          Cancel
        </Button>
        <Button bgColor="#03a9f5" type="submit" disabled={isCreating}>
          Submit
        </Button>
      </div>
    </form>
  );
}

export default AddCustomerForm;
