import { useNavigate } from "react-router-dom";
import { useMedicineContext } from "../../context/MedicineContext";

import DoubleArrowIcon from "../../data/inventory-assets/double-arrow.svg";
import TrashIcon from "../../data/inventory-assets/trash-black.svg";

import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteGroup } from "./useGroupAction";
import { useGetMedicinesByGroup } from "./useMedicineAction";

function GroupRow({ group }) {
  const { _id, groupName } = group;

  const { medicinesByGroup } = useGetMedicinesByGroup(_id);

  const navigate = useNavigate();

  const { groupDeleteClicked } = useMedicineContext();

  const { isDeleting, deleteGroup } = useDeleteGroup();

  function handleClick() {
    navigate(`/inventory/groups/${groupName}?id=${_id}`);
  }

  return (
    <Table.Row>
      <div>{groupName}</div>
      <div>{medicinesByGroup?.length}</div>
      {groupDeleteClicked ? (
        <Modal>
          <Modal.Open opens="deleteGroup">
            <button className="flex items-center gap-3">
              <img src={TrashIcon} alt="doubleArrow" className="w-4" />
              <p className="text-sm font-semibold">Delete</p>
            </button>
          </Modal.Open>
          <Modal.Window name="deleteGroup">
            <ConfirmDelete
              resourceName={groupName}
              disabled={isDeleting}
              onConfirm={() => deleteGroup(_id)}
            />
          </Modal.Window>
        </Modal>
      ) : (
        <button className="flex items-center gap-3">
          <p className="text-sm font-semibold" onClick={handleClick}>
            View Full Detail
          </p>
          <img src={DoubleArrowIcon} alt="doubleArrow" />
        </button>
      )}
    </Table.Row>
  );
}

export default GroupRow;
