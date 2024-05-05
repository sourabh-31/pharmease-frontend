import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMedicines } from "./useMedicineAction";

import styles from "../../styles/CreateGroupForm.module.css";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import Box from "../../ui/Box";
import { useCreateGroup } from "./useGroupAction";

function CreateMedicineForm({ onCloseModal }) {
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;

  const [medicineArray, setMedicineArray] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const { isLoading, medicines } = useMedicines();

  const filteredMedicine = medicines.filter((medicine) => {
    return medicine.medicineName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
  });

  const { isCreating, createGroup } = useCreateGroup();

  function onSubmit(data) {
    // console.log({ ...data, medicineIds: medicineArray.map((item) => item.id) });
    createGroup(
      { ...data, medicineIds: medicineArray.map((item) => item.id) },
      {
        onSuccess: () => {
          reset();
          onCloseModal();
        },
      }
    );
  }

  function onError(errors) {
    // console.error(errors);
  }

  function handleChange(medName, medId) {
    // console.log(medName, medId);
    const medExist = medicineArray.some((med) => med.id === medId);
    if (!medExist)
      setMedicineArray((val) => [...val, { id: medId, medicine: medName }]);
  }

  function handleDelete(id) {
    setMedicineArray((arr) => arr.filter((val) => val.id !== id));
  }

  return (
    <form
      className="w-[50rem] max-h-[80vh] overflow-auto"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <FormRow label="Group Name" error={errors?.groupName?.message}>
        <input
          className={styles.input}
          type="text"
          id="groupName"
          {...register("groupName", {
            required: "This Field is required",
          })}
        />
      </FormRow>

      <div className={styles.select}>
        <label htmlFor="medicines" className="font-medium">
          Medicine
        </label>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Search Medicine"
            className={styles.input}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            id="medicines"
            size="5"
            className={styles.input}
            style={{ cursor: "pointer" }}
            disabled={isLoading}
            onChange={(e) => {
              const selectedOption = filteredMedicine.find(
                (medicine) => medicine.medicineName === e.target.value
              );
              if (selectedOption) {
                handleChange(e.target.value, selectedOption._id);
              }
            }}
          >
            {filteredMedicine.length === 0 ? (
              <option value="">No matching medicines</option>
            ) : (
              <>
                <option value="">-- Select an option --</option>
                {filteredMedicine.map((medicine) => (
                  <option key={medicine._id} value={medicine.medicineName}>
                    {medicine.medicineName}
                  </option>
                ))}
              </>
            )}
          </select>
        </div>
      </div>

      {medicineArray.length ? (
        <div className="border-b-[1px] border-[#f3f4f6]">
          <div className="flex items-center justify-end flex-wrap gap-2 w-[20rem] ml-auto mr-auto my-4">
            {medicineArray.map((med) => (
              <Box
                key={med.id}
                boxName={med.medicine}
                onClick={() => handleDelete(med.id)}
              />
            ))}
          </div>
        </div>
      ) : null}

      <FormRow label="Description">
        <textarea
          className={styles.input}
          type="text"
          id="description"
          placeholder="Optional"
          {...register("description")}
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
