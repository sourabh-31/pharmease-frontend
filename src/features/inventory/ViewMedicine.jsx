import { useForm } from "react-hook-form";

import FormRow from "../../ui/FormRow";
import styles from "../../styles/ViewMedicine.module.css";
import Button from "../../ui/Button";
import { useState } from "react";
import { useUpdateMedicine } from "./useMedicineAction";
import toast from "react-hot-toast";

function ViewMedicine({ onCloseModal, medicine }) {
  const [toggleField, setToggleField] = useState(true);

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: medicine,
    disabled: toggleField,
  });

  const { errors } = formState;

  const { isUpdating, updateMedicine } = useUpdateMedicine();

  function onError(errors) {
    // console.error(errors);
  }

  function onSubmit(data) {
    // console.log(data);
    updateMedicine(
      { newMedicineData: data, id: medicine._id },
      {
        onSuccess: () => {
          reset();
          onCloseModal();
          toast.success("Medicine updated successfully");
        },
      }
    );
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
        {!toggleField && (
          <Button
            textColor="#000"
            border={true}
            onClick={() => setToggleField(true)}
            type="button"
            disabled={isUpdating}
          >
            Cancel
          </Button>
        )}

        {toggleField && (
          <Button
            bgColor="#03a9f5"
            onClick={() => setToggleField(false)}
            type="button"
          >
            Update
          </Button>
        )}

        {!toggleField && (
          <Button
            bgColor="#01a768"
            onClick={() => setToggleField(false)}
            type="submit"
            disabled={isUpdating}
          >
            Confirm
          </Button>
        )}
      </FormRow>
    </form>
  );
}

export default ViewMedicine;
