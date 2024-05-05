import { useState } from "react";
import styles from "../../styles/AddMedicine.module.css";
import { useInvoiceContext } from "../../context/InvoiceContext";
import Button from "../../ui/Button";
import { useMedicines } from "../inventory/useMedicineAction";

function AddMedicine({ onCloseModal }) {
  const [searchQuery, setSearchQuery] = useState("");

  const { medicines } = useMedicines();

  const { setMedId } = useInvoiceContext();

  function handleClick(group, id) {
    onCloseModal();
    setMedId(id);
  }

  function handleCancel() {
    onCloseModal();
  }

  const filteredMedicine = medicines.filter((group) =>
    group.medicineName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <label htmlFor="medicines" className="font-medium text-2xl">
        Medicine
      </label>
      <div className="flex flex-col gap-4 mt-4">
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
          style={{ cursor: "pointer", width: "20rem" }}
          // disabled={isLoading}
          onChange={(e) => {
            const selectedOption = filteredMedicine.find(
              (medicine) => medicine.medicineName === e.target.value
            );
            if (selectedOption) {
              handleClick(e.target.value, selectedOption._id);
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
      <div className="flex justify-end -mb-4 mt-6">
        <Button
          textColor="#fff"
          bgColor="#03a9f5"
          onClick={handleCancel}
          //   disabled={isLoading}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default AddMedicine;
