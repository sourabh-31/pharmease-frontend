import { useGroups } from "../features/inventory/useGroupAction";

import GroupHeader from "../features/inventory/GroupHeader";
import GroupRow from "../features/inventory/GroupRow";
import Table from "../ui/Table";
import Spinner from "../ui/Spinner";
import toast from "react-hot-toast";
import { useMedicineContext } from "../context/MedicineContext";

function GroupsTable() {
  const { isLoading, groups, error } = useGroups();

  const { groupSearch: searchQuery } = useMedicineContext();

  const ascGroups = groups?.sort((a, b) =>
    typeof a.groupName === "string"
      ? a.groupName.localeCompare(b.groupName)
      : a.groupName - b.groupName
  );

  const filteredGroups = ascGroups.filter((group) =>
    group.groupName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) return <Spinner />;

  if (error) {
    toast.error(error.message);
  }

  return (
    <>
      <GroupHeader />

      <Table column="2.4fr 2fr 1fr">
        <Table.Header>
          <div>Group Name</div>
          <div>No. Of Medicines</div>
          <div>Action</div>
        </Table.Header>
        <Table.Body
          data={filteredGroups}
          render={(group) => <GroupRow key={group._id} group={group} />}
        />
      </Table>
      <Table.Footer />
    </>
  );
}

export default GroupsTable;
