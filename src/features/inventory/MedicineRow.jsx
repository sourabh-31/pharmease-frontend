import { useMedicineContext } from "../../context/MedicineContext";

import DoubleArrowIcon from "../../data/inventory-assets/double-arrow.svg";
import TrashIcon from "../../data/inventory-assets/trash-black.svg";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";

import Table from "../../ui/Table";
import ViewMedicine from "./ViewMedicine";
import { useDeleteMedicine } from "./useMedicineAction";

function MedicineRow({ medicine }) {
  const { _id, medicineName, batchNumber, price, expireDate, quantity } =
    medicine;

  const { isDeleting, deleteMedicine } = useDeleteMedicine();

  const { isDeleteClicked } = useMedicineContext();

  return (
    <Table.Row>
      <div>{medicineName}</div>
      <div>{batchNumber}</div>
      <div>Rs. {price}</div>
      <div>{expireDate}</div>
      <div>{quantity}</div>
      <Modal>
        {isDeleteClicked ? (
          <Modal.Open opens="deleteMedicine">
            <button className="flex items-center gap-3">
              <img src={TrashIcon} alt="doubleArrow" className="w-4" />
              <p className="text-sm font-semibold">Delete</p>
            </button>
          </Modal.Open>
        ) : (
          <Modal.Open opens="viewMedicine">
            <button className="flex items-center gap-3">
              <p className="text-sm font-semibold">View Detail</p>
              <img src={DoubleArrowIcon} alt="doubleArrow" />
            </button>
          </Modal.Open>
        )}

        <Modal.Window name="viewMedicine">
          <ViewMedicine medicine={medicine} />
        </Modal.Window>

        <Modal.Window name="deleteMedicine">
          <ConfirmDelete
            resourceName={medicineName}
            disabled={isDeleting}
            onConfirm={() => deleteMedicine(_id)}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default MedicineRow;
