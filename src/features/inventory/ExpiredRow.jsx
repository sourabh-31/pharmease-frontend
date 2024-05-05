import { useDeleteExpired } from "./useMedicineAction";

import DoubleArrowIcon from "../../data/inventory-assets/double-arrow.svg";
import TrashIcon from "../../data/inventory-assets/trash-black.svg";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";

import Table from "../../ui/Table";

function ExpiredRow({ medicine }) {
  const { _id, medicineName, price, groupName, expireDate, quantity } =
    medicine;

  const { isDeleting, deleteExpired } = useDeleteExpired();

  return (
    <Table.Row>
      <div>{medicineName}</div>
      <div>Rs. {price}</div>
      <div>{quantity}</div>
      <div>{expireDate}</div>
      <Modal>
        <Modal.Open opens="deleteExpired">
          <button className="flex items-center gap-2">
            <p className="text-sm font-semibold">Resolve now</p>
            <img src={DoubleArrowIcon} alt="doubleArrow" className="w-2" />
          </button>
        </Modal.Open>

        <Modal.Window name="deleteExpired">
          <ConfirmDelete
            resourceName={medicineName}
            disabled={isDeleting}
            onConfirm={() => deleteExpired(_id)}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default ExpiredRow;
