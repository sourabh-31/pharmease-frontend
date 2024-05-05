import { useUpdateMedicine } from "./useMedicineAction";
import { useState } from "react";

import TrashIcon from "../../data/inventory-assets/trash-black.svg";

import toast from "react-hot-toast";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import ConfirmRemove from "../../ui/ConfirmRemove";

function GroupDetailRow({ group, groupId, onCloseModal }) {
  // console.log(group);
  const [filterGroup, setFilterGroup] = useState([]);

  const { _id, medicineName, quantity, price, groupIds } = group;

  const { isUpdating, updateMedicine } = useUpdateMedicine(groupId);

  function handleDelete() {
    setFilterGroup(groupIds.filter((item) => item !== groupId));
  }

  function handleConfirm() {
    updateMedicine(
      {
        newMedicineData: { ...group, groupIds: filterGroup },
        id: _id,
      },
      {
        onSuccess: () => {
          onCloseModal;
          toast.success("Medicine removed successfully");
        },
      }
    );
  }

  return (
    <Table.Row>
      <div>{medicineName}</div>
      <div>Rs. {price}</div>
      <div>{quantity}</div>
      <Modal>
        <Modal.Open opens="remove-med">
          <button className="flex items-center gap-2" onClick={handleDelete}>
            <img src={TrashIcon} alt="doubleArrow" className="w-4" />
            <p className="text-sm font-semibold">Remove from Group</p>
          </button>
        </Modal.Open>
        <Modal.Window name="remove-med">
          <ConfirmRemove
            resourceName={medicineName}
            onConfirm={handleConfirm}
            disabled={isUpdating}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default GroupDetailRow;
