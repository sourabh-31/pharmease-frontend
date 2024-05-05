import toast from "react-hot-toast";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import GroupDetailRow from "./GroupDetailRow";
import { useGetMedicinesByGroup } from "./useMedicineAction";
import { useMedicineContext } from "../../context/MedicineContext";

function GroupDetailTable({ groupId, isLoading, error }) {
  const { medicinesByGroup } = useGetMedicinesByGroup(groupId);

  const { detailSearch: searchQuery } = useMedicineContext();

  const filteredMedicinesByGroup = medicinesByGroup.filter((group) =>
    group.medicineName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) return <Spinner />;

  if (error) {
    toast.error(error.message);
  }

  return (
    <>
      <Table column="2.5fr 1.5fr 1.5fr 1.5fr">
        <Table.Header>
          <div>Medicine Name</div>
          <div>Price</div>
          <div>Quantity</div>
          <div>Action</div>
        </Table.Header>
        <Table.Body
          data={filteredMedicinesByGroup}
          render={(group) => (
            <GroupDetailRow key={group._id} group={group} groupId={groupId} />
          )}
        />
      </Table>
      <Table.Footer />
    </>
  );
}

export default GroupDetailTable;
