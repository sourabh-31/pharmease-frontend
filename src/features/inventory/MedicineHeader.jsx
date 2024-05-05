import { useMedicineContext } from "../../context/MedicineContext";
import TrashIcon from "../../data/inventory-assets/trash.svg";

import Button from "../../ui/Button";
import Search from "../../ui/Search";
import SelectGroup from "./SelectGroup";

function MedicineHeader() {
  const { toggleDelete, isDeleteClicked, medicineSearch, setMedicineSearch } =
    useMedicineContext();

  return (
    <div className="flex items-center justify-between mr-1 mt-6 mb-10">
      <div className="border-[1px] border-[#d1d5db] rounded-md">
        <Search
          placeholderText="Search Medicine Inventory..."
          width="20"
          bgColor="white"
          value={medicineSearch}
          onChange={(e) => setMedicineSearch(e.target.value)}
        />
      </div>
      <SelectGroup />
      <div className="-mt-1">
        <Button
          bgColor={isDeleteClicked ? "#03a9f5" : "#f0483e"}
          img={isDeleteClicked ? "" : TrashIcon}
          imgWidth="1.1rem"
          onClick={toggleDelete}
        >
          {isDeleteClicked ? "Cancel Delete" : "Delete Item"}
        </Button>
      </div>
    </div>
  );
}

export default MedicineHeader;
