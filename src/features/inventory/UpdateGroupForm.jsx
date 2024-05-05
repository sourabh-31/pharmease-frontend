import { useState } from "react";
import {
  useAddMedicinesToGroup,
  useGetMedicinesByGroup,
  useMedicines,
} from "./useMedicineAction";
import { useSearchParams } from "react-router-dom";

import PlusIcon from "../../data/inventory-assets/plus.svg";

import Button from "../../ui/Button";
import Box from "../../ui/Box";

function UpdateGroupForm({ onCloseModal }) {
  const [searchParams] = useSearchParams();
  const groupId = searchParams.get("id");

  const { medicinesByGroup } = useGetMedicinesByGroup(groupId);

  const selectedValues = medicinesByGroup.map((item) => item.medicineName);
  const selectedId = medicinesByGroup.map((item) => item._id);

  const [medicineArray, setMedicineArray] = useState(selectedValues);
  const [idArray, setIdArray] = useState(selectedId);

  const [searchQuery, setSearchQuery] = useState("");

  const { isLoading, medicines } = useMedicines();
  const options = medicines.map((medicine) => medicine);

  const { isUpdating, addMedicinesToGroup } = useAddMedicinesToGroup(groupId);

  function handleChange(medName, medId) {
    const medExist = idArray.some((id) => id === medId);
    if (!medExist) {
      setIdArray((val) => [...val, medId]);
      setMedicineArray((val) => [...val, medName]);
    }
  }

  function handleDelete(index) {
    setMedicineArray((arr) => arr.filter((val, i) => i !== index));
    setIdArray((arr) => arr.filter((val, i) => i !== index));
  }

  function handleConfirm() {
    addMedicinesToGroup(
      { groupId: groupId, medicineIds: idArray },
      { onSuccess: onCloseModal }
    );
  }

  const filteredOptions = options.filter((option) =>
    option.medicineName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-[20rem]">
      <p className="text-2xl font-medium mb-4">Add Medicine</p>
      <div className="flex flex-col">
        <input
          type="text"
          placeholder="Search Medicine"
          className="border-[1px] border-[#d1d5db] bg-white px-4 py-2 rounded-md mb-4"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          id="medicines"
          size="5"
          className="border-[1px] border-[#d1d5db] bg-white rounded-md py-[0.5rem] px-[1rem] w-[20rem]"
          style={{ cursor: "pointer" }}
          disabled={isLoading}
          onChange={(e) => {
            const selectedOption = filteredOptions.find(
              (option) => option.medicineName === e.target.value
            );
            if (selectedOption) {
              handleChange(e.target.value, selectedOption._id);
            }
          }}
        >
          {filteredOptions.length === 0 ? (
            <option value="">No matching medicines</option>
          ) : (
            <>
              <option value="">-- Select an option --</option>
              {filteredOptions.map((option) => (
                <option key={option._id} value={option.medicineName}>
                  {option.medicineName}
                </option>
              ))}
            </>
          )}
        </select>
      </div>

      {medicineArray.length ? (
        <div className="border-b-[1px] border-[#f3f4f6]">
          <div className="flex items-center justify-end flex-wrap gap-2 w-[20rem] ml-auto mr-auto my-4">
            {medicineArray.map((med, index) => (
              <Box
                key={index}
                boxName={med}
                onClick={() => handleDelete(index)}
                disabled={medicinesByGroup.some(
                  (item) => item.medicineName === med
                )}
              />
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-6 flex justify-end">
        <Button
          img={PlusIcon}
          bgColor="#01a768"
          onClick={handleConfirm}
          disabled={isUpdating}
        >
          Add Medicine
        </Button>
      </div>
    </div>
  );
}

export default UpdateGroupForm;
