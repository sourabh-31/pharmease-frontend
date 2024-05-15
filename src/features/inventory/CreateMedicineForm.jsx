import { useForm } from "react-hook-form";
import { useCreateMedicine } from "./useMedicineAction";

import styles from "../../styles/CreateMedicineForm.module.css";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";

function CreateMedicineForm({ onCloseModal }) {
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;

  const { isCreating, createMedicine } = useCreateMedicine();

  function onSubmit(data) {
    // console.log({ ...data, groupName: groupName });
    createMedicine(data, {
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
    <form
      className="w-[50rem] max-h-[80vh] overflow-auto"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <FormRow label="Medicine Name" error={errors?.medicineName?.message}>
        <input
          className={styles.input}
          type="text"
          id="medicineName"
          {...register("medicineName", {
            required: "This Field is required",
          })}
        />
      </FormRow>

      <FormRow label="Batch No." error={errors?.batchNumber?.message}>
        <input
          className={styles.input}
          type="text"
          id="batchNumber"
          {...register("batchNumber", {
            required: "This Field is required",
          })}
        />
      </FormRow>

      <FormRow label="Pack" error={errors?.pack?.message}>
        <input
          className={styles.input}
          type="text"
          id="pack"
          {...register("pack", {
            valueAsNumber: true,
            required: "This Field is required",
            min: {
              value: 1,
              message: "Quantity should atleast be 1",
            },
            validate: {
              isNumber: (value) =>
                !isNaN(parseFloat(value)) || "Please enter a valid number",
            },
          })}
        />
      </FormRow>

      <FormRow label="Quantity" error={errors?.quantity?.message}>
        <input
          className={styles.input}
          type="text"
          id="quantity"
          {...register("quantity", {
            valueAsNumber: true,
            required: "This Field is required",
            min: {
              value: 1,
              message: "Quantity should atleast be 1",
            },
            validate: {
              isNumber: (value) =>
                !isNaN(parseFloat(value)) || "Please enter a valid number",
            },
          })}
        />
      </FormRow>

      <FormRow label="Price (₹)" error={errors?.price?.message}>
        <input
          className={styles.input}
          type="text"
          id="price"
          {...register("price", {
            valueAsNumber: true,
            required: "This Field is required",
            min: {
              value: 0.1,
              message: "Price should atleast be 0.1",
            },
            validate: {
              isNumber: (value) =>
                !isNaN(parseFloat(value)) || "Please enter a valid number",
            },
          })}
        />
      </FormRow>

      <FormRow label="Purchase Date" error={errors?.purchaseDate?.message}>
        <input
          className={styles.input}
          id="purchaseDate"
          type="date"
          {...register("purchaseDate", {
            required: "This Field is required",
          })}
        />
      </FormRow>

      <FormRow label="Expire Date" error={errors?.expireDate?.message}>
        <input
          className={styles.input}
          id="expiryDate"
          type="date"
          {...register("expireDate", {
            required: "This Field is required",
          })}
        />
      </FormRow>

      <FormRow label="Shelf" error={errors?.shelf?.message}>
        <input
          className={styles.input}
          type="text"
          id="shelf"
          placeholder="Optional"
          {...register("shelf")}
        />
      </FormRow>

      <FormRow label="How To Use">
        <textarea
          className={styles.input}
          type="text"
          id="howToUse"
          placeholder="Optional"
          {...register("howToUse")}
        />
      </FormRow>

      <FormRow label="Side Effects">
        <textarea
          className={styles.input}
          type="text"
          id="sideEffects"
          placeholder="Optional"
          {...register("sideEffects")}
        />
      </FormRow>

      <FormRow>
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
      </FormRow>
    </form>
  );
}

export default CreateMedicineForm;
