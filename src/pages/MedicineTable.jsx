import toast from "react-hot-toast";

import {
  useGetMedicinesByGroup,
  useMedicines,
} from "../features/inventory/useMedicineAction";

import MedicineHeader from "../features/inventory/MedicineHeader";
import MedicineRow from "../features/inventory/MedicineRow";
import Table from "../ui/Table";
import Spinner from "../ui/Spinner";
import { useMedicineContext } from "../context/MedicineContext";

function MedicineTable() {
  const { isLoading, medicines, error } = useMedicines();

  const {
    groupId,
    groupName,
    medicineSearch: searchQuery,
  } = useMedicineContext();

  const { medicinesByGroup } = useGetMedicinesByGroup(groupId);

  const ascMedicines = medicines?.sort((a, b) =>
    typeof a.medicineName === "string"
      ? a.medicineName.localeCompare(b.medicineName)
      : a.medicineName - b.medicineName
  );

  const filteredMedicines =
    groupName === "Select Group"
      ? ascMedicines.filter((medicine) =>
          medicine.medicineName
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : medicinesByGroup.filter((medicine) =>
          medicine.medicineName
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        );

  if (isLoading) return <Spinner />;

  if (error) {
    toast.error(error.message);
  }

  return (
    <>
      <MedicineHeader />
      <Table column="1.8fr 1fr 0.8fr 1fr 0.8fr 1fr">
        <Table.Header>
          <div>Medicine Name</div>
          <div>Batch No.</div>
          <div>Price</div>
          <div>Expire Date</div>
          <div className="-ml-1">Stock Qty</div>
          <div>Action</div>
        </Table.Header>
        <Table.Body
          data={filteredMedicines}
          render={(medicine) => (
            <MedicineRow key={medicine._id} medicine={medicine} />
          )}
        />
      </Table>
      <Table.Footer />
    </>
  );
}

export default MedicineTable;
