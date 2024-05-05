import { useState } from "react";
import { useMedicineContext } from "../../context/MedicineContext";
import Button from "../../ui/Button";
import { useGroups } from "./useGroupAction";

function MedicineGroupList({ onCloseModal }) {
  const { isLoading, groups } = useGroups();

  const { handleGroupName, handleGroupId } = useMedicineContext();

  const [searchQuery, setSearchQuery] = useState("");

  function handleClick(group, id) {
    handleGroupName(group);
    handleGroupId(id);
    onCloseModal();
  }

  function handleReset() {
    handleGroupName("Select Group");
    onCloseModal();
  }

  const filteredGroups = groups.filter((group) =>
    group.groupName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <p className="text-2xl font-medium mb-4">Medicine Groups</p>
      <div className="flex flex-col">
        <input
          type="text"
          placeholder="Search Group"
          className="border-[1px] border-[#d1d5db] bg-white px-4 py-2 rounded-md mb-4"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          size="5"
          className="border-[1px] border-[#d1d5db] px-4 py-2 rounded-md w-[20rem]"
          style={{ cursor: "pointer" }}
          onChange={(e) => {
            const selectedGroup = filteredGroups.find(
              (group) => group.groupName === e.target.value
            );
            if (selectedGroup) {
              handleClick(selectedGroup.groupName, selectedGroup._id);
            }
          }}
        >
          <option value="">-- Select a Group --</option>
          {filteredGroups.map((group) => (
            <option key={group._id} value={group.groupName}>
              {group.groupName}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-end -mb-4 mt-6">
        <Button
          textColor="#fff"
          bgColor="#03a9f5"
          onClick={handleReset}
          disabled={isLoading}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}

export default MedicineGroupList;
